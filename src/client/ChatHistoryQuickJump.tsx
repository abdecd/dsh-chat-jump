import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { EditableMessageBlock, RetryableTurn } from '../shared.ts'
import styles from './ChatHistoryQuickJump.module.css'

interface ChatHistoryQuickJumpProps {
  messages?: readonly EditableMessageBlock[]
  retryableTurns?: readonly RetryableTurn[]
}

interface QuestionItem {
  id: string
  turn: number
  text: string
  time?: number | undefined
}

function formatTime(timestamp?: number): string {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function cleanQuestionText(text: string): string {
  return text
    .replace(/^#+\s+/gm, '')
    .replace(/```[\s\S]*?```/g, '[代码]')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Outline / Compass SVG Icon */
function CompassIcon(): ReactNode {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8 13.2C5.13 13.2 2.8 10.87 2.8 8C2.8 5.13 5.13 2.8 8 2.8C10.87 2.8 13.2 5.13 13.2 8C13.2 10.87 10.87 13.2 8 13.2ZM10.5 5.5L6.5 7.5L5.5 10.5L9.5 8.5L10.5 5.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Arrow Up Icon */
function ArrowUpIcon(): ReactNode {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.5L3.5 8L4.55 9.05L7.25 6.35V12.5H8.75V6.35L11.45 9.05L12.5 8L8 3.5Z" fill="currentColor" />
    </svg>
  )
}

/** Arrow Down Icon */
function ArrowDownIcon(): ReactNode {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12.5L12.5 8L11.45 6.95L8.75 9.65V3.5H7.25V9.65L4.55 6.95L3.5 8L8 12.5Z" fill="currentColor" />
    </svg>
  )
}

/** Close icon used by the touch-friendly mobile panel. */
function CloseIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Find the true scrolling container of the conversation (marked by data-conversation-scroll or overflowing ancestor) */
function findActualScroller(targetEl?: HTMLElement | null): HTMLElement {
  if (targetEl) {
    let el: HTMLElement | null = targetEl
    while (el && el !== document.body && el !== document.documentElement) {
      if (el.hasAttribute('data-conversation-scroll')) {
        return el
      }
      const style = window.getComputedStyle(el)
      const overflowY = style.overflowY
      if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
        return el
      }
      el = el.parentElement
    }
  }

  const conversationScroller = document.querySelector<HTMLElement>('[data-conversation-scroll]')
  if (conversationScroller) return conversationScroller

  const chatFlow = document.querySelector('[data-chat-flow]')
  if (chatFlow?.parentElement && chatFlow.parentElement.scrollHeight > chatFlow.parentElement.clientHeight) {
    return chatFlow.parentElement
  }

  return (document.scrollingElement as HTMLElement) || document.documentElement
}

/** Find all genuine user input flow items in the DOM in exact render order (excluding context, artifacts, commands, compactions) */
function getUserElements(): HTMLElement[] {
  const chatFlow = document.querySelector('[data-chat-flow]')
  if (!chatFlow) return []

  // 1. Direct match: all flow items of kind "user"
  const userFlowItems = Array.from(
    chatFlow.querySelectorAll<HTMLElement>('[data-chat-flow-kind="user"]'),
  )
  if (userFlowItems.length > 0) {
    return userFlowItems
  }

  // 2. Fallback: all non-context user rows
  return Array.from(
    chatFlow.querySelectorAll<HTMLElement>('[class*="userRow"]:not([class*="contextRow"])'),
  )
}

/** Extract text from a user message DOM node */
function getQuestionTextFromNode(node: HTMLElement): string {
  const bubble = node.querySelector<HTMLElement>('[class*="bubble"]')
  const rawText = bubble ? (bubble.textContent ?? '') : (node.textContent ?? '')
  return cleanQuestionText(rawText)
}

/** Find target DOM node with multi-stage matching */
/** Find corresponding DOM element for a question across pagination states */
function findElementForQuestion(q: QuestionItem, allQuestions: QuestionItem[]): HTMLElement | null {
  const chatFlow = document.querySelector('[data-chat-flow]')
  if (!chatFlow) return null

  const userElements = getUserElements()
  if (userElements.length === 0) return null

  // 1. Match by exact text content
  const qClean = q.text.slice(0, 30).replace(/\s+/g, '')
  if (qClean.length > 0) {
    for (const el of userElements) {
      const elText = getQuestionTextFromNode(el).replace(/\s+/g, '')
      if (elText && (elText.includes(qClean) || qClean.includes(elText.slice(0, 20)))) {
        return el
      }
    }
  }

  // 2. If DOM element count equals total question count (all history loaded)
  if (userElements.length === allQuestions.length) {
    const qIndex = allQuestions.findIndex(item => item.id === q.id)
    if (qIndex >= 0 && userElements[qIndex]) {
      return userElements[qIndex]
    }
  }

  // 3. Tail-offset matching (ChatView loads the tail page first)
  const qIndexFromEnd = allQuestions.length - 1 - allQuestions.findIndex(item => item.id === q.id)
  const elIndex = userElements.length - 1 - qIndexFromEnd
  if (elIndex >= 0 && elIndex < userElements.length && userElements[elIndex]) {
    const elText = getQuestionTextFromNode(userElements[elIndex])
    if (!q.text || !elText || elText.includes(q.text.slice(0, 16)) || q.text.includes(elText.slice(0, 16))) {
      return userElements[elIndex]
    }
  }

  return null
}

/** Automatically trigger "加载更早" (load older) if target question is in unpaged history */
async function loadOlderUntilFound(
  targetQuestion: QuestionItem,
  allQuestions: QuestionItem[],
  maxAttempts = 5,
): Promise<HTMLElement | null> {
  let attempts = 0
  while (attempts < maxAttempts) {
    const el = findElementForQuestion(targetQuestion, allQuestions)
    if (el) return el

    const loadOlderBtn = document.querySelector<HTMLButtonElement>(
      '[class*="older"] button:not(:disabled)',
    )
    if (!loadOlderBtn) break

    loadOlderBtn.click()

    // Wait for older messages to prepend into DOM
    await new Promise<void>((resolve) => {
      const chatFlow = document.querySelector('[data-chat-flow]')
      if (!chatFlow) {
        setTimeout(resolve, 300)
        return
      }
      const obs = new MutationObserver(() => {
        obs.disconnect()
        resolve()
      })
      obs.observe(chatFlow, { childList: true, subtree: true })
      setTimeout(() => {
        obs.disconnect()
        resolve()
      }, 700)
    })

    attempts += 1
  }

  return findElementForQuestion(targetQuestion, allQuestions)
}

/** Execute smooth scroll to target message element */
function performScrollTo(targetNode: HTMLElement): void {
  const convScroller = document.querySelector<HTMLElement>('[data-conversation-scroll]')
  const chatFlow = document.querySelector('[data-chat-flow]')
  const scrollWrapper = chatFlow?.parentElement

  let scroller: HTMLElement | null = null
  if (convScroller && convScroller.scrollHeight > convScroller.clientHeight) {
    scroller = convScroller
  } else if (scrollWrapper && scrollWrapper.scrollHeight > scrollWrapper.clientHeight) {
    scroller = scrollWrapper
  } else {
    scroller = findActualScroller(targetNode)
  }

  if (scroller && scroller.scrollHeight > scroller.clientHeight) {
    const scrollerRect = scroller.getBoundingClientRect()
    const targetRect = targetNode.getBoundingClientRect()
    const targetTop = Math.max(0, scroller.scrollTop + (targetRect.top - scrollerRect.top) - 20)

    // If currently at or near the bottom, break out of ChatView's atBottom snap-lock (>25px)
    const isNearBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= 40
    if (isNearBottom && targetTop < scroller.scrollTop) {
      scroller.scrollTop = Math.max(0, scroller.scrollTop - 35)
      scroller.dispatchEvent(new Event('scroll'))
    }

    scroller.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })
  } else {
    try {
      targetNode.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      // ignore
    }
  }
}

export function ChatHistoryQuickJump({
  messages = [],
  retryableTurns = [],
}: ChatHistoryQuickJumpProps): ReactNode {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [posRight, setPosRight] = useState<number>(20)
  const [chatInView, setChatInView] = useState<boolean>(false)
  const [domVersion, setDomVersion] = useState(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const listContainerRef = useRef<HTMLDivElement | null>(null)
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hover is not available on most phones. Keep the panel tap-driven there and
  // also react to orientation / breakpoint changes without relying on user agent sniffing.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px), (hover: none) and (pointer: coarse)')
    const updateMobileState = (): void => {
      setIsMobile(mediaQuery.matches)
    }

    updateMobileState()
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMobileState)
    } else {
      // Safari versions that predate MediaQueryListEventTarget.
      mediaQuery.addListener(updateMobileState)
    }
    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', updateMobileState)
      } else {
        mediaQuery.removeListener(updateMobileState)
      }
    }
  }, [])

  // Clean up pending timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current !== null) {
        clearTimeout(hoverTimerRef.current)
      }
      if (highlightTimerRef.current !== null) {
        clearTimeout(highlightTimerRef.current)
      }
    }
  }, [])

  // Listen to DOM mutations inside chat flow to stay 100% synchronized
  useEffect(() => {
    let flowObserver: MutationObserver | null = null
    let rafId: number | null = null

    const scheduleDomUpdate = (): void => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setDomVersion(v => v + 1)
      })
    }

    const attachFlowObserver = (): void => {
      flowObserver?.disconnect()
      const chatFlow = document.querySelector('[data-chat-flow]')
      if (chatFlow) {
        flowObserver = new MutationObserver(scheduleDomUpdate)
        flowObserver.observe(chatFlow, { childList: true, subtree: true, characterData: true })
      }
    }

    attachFlowObserver()
    const bodyObserver = new MutationObserver(() => {
      attachFlowObserver()
      scheduleDomUpdate()
    })
    bodyObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      flowObserver?.disconnect()
      bodyObserver.disconnect()
    }
  }, [])

  // Build question list from history authority (messages / retryableTurns) or DOM fallback
  const questions = useMemo<QuestionItem[]>(() => {
    const userMsgs = messages.filter(m => m.kind === 'user' && m.text.trim().length > 0)
    const userTurns = retryableTurns.filter(t => t.preview.trim().length > 0)

    if (userMsgs.length > 0 || userTurns.length > 0) {
      const list: QuestionItem[] = []
      const seenTurns = new Set<number>()

      for (const msg of userMsgs) {
        if (!seenTurns.has(msg.turn)) {
          seenTurns.add(msg.turn)
          list.push({
            id: msg.key,
            turn: msg.turn,
            text: cleanQuestionText(msg.text),
            time: msg.time,
          })
        }
      }

      if (list.length === 0 && userTurns.length > 0) {
        for (const rt of userTurns) {
          list.push({
            id: `turn-${String(rt.turn)}`,
            turn: rt.turn,
            text: cleanQuestionText(rt.preview),
            time: rt.time,
          })
        }
      }

      return list
    }

    // Fallback if controller data not yet loaded
    const userNodes = getUserElements()
    return userNodes.map((node, idx) => {
      const text = getQuestionTextFromNode(node)
      return {
        id: node.dataset.chatFlowKey || node.dataset.chatAnchorKey || `user-node-${String(idx)}`,
        turn: idx + 1,
        text: text || `提问 #${String(idx + 1)}`,
      }
    })
  }, [messages, retryableTurns, domVersion])

  // Auto-scroll the expanded question list to the currently active question ONLY upon expanding
  const prevExpandedRef = useRef(false)
  useEffect(() => {
    if (isExpanded && !prevExpandedRef.current) {
      requestAnimationFrame(() => {
        const container = listContainerRef.current
        if (!container) return
        const activeEl = container.querySelector<HTMLElement>(`button[data-active="true"]`)
          || (container.children[activeIndex] as HTMLElement)
        if (activeEl) {
          const containerHeight = container.clientHeight
          const activeTop = activeEl.offsetTop
          const activeHeight = activeEl.offsetHeight
          const targetScroll = Math.max(0, activeTop - (containerHeight / 2) + (activeHeight / 2))
          container.scrollTop = targetScroll
        }
      })
    }
    prevExpandedRef.current = isExpanded
  }, [isExpanded, activeIndex])

  // Track chat container position to keep fixed widget pinned to the right edge of chat view
  useEffect(() => {
    let rafId: number | null = null

    const updatePosition = (): void => {
      const chatFlow = document.querySelector('[data-chat-flow]')
      if (!chatFlow) {
        setChatInView(false)
        return
      }
      setChatInView(true)
      const scroller = findActualScroller()
      if (scroller) {
        const rect = scroller.getBoundingClientRect()
        const offset = Math.max(16, window.innerWidth - rect.right + 18)
        setPosRight(offset)
      } else {
        setPosRight(20)
      }
    }

    const scheduleUpdatePosition = (): void => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        updatePosition()
      })
    }

    updatePosition()
    window.addEventListener('resize', scheduleUpdatePosition)
    const observer = new MutationObserver(scheduleUpdatePosition)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', scheduleUpdatePosition)
      observer.disconnect()
    }
  }, [])

  // Scroll spy: observe scroll events on the actual conversation scroller
  useEffect(() => {
    const getActiveScroller = (): HTMLElement | null => {
      const convScroller = document.querySelector<HTMLElement>('[data-conversation-scroll]')
      if (convScroller && convScroller.scrollHeight > convScroller.clientHeight) {
        return convScroller
      }
      return findActualScroller()
    }

    let ticking = false
    const onScroll = (): void => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const scroller = getActiveScroller()
        if (!scroller || questions.length === 0) return

        const userNodes = getUserElements()
        if (userNodes.length === 0) return

        const scrollerRect = scroller.getBoundingClientRect()
        const isAtBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 24

        if (isAtBottom) {
          setActiveIndex(questions.length - 1)
          return
        }

        const triggerY = scrollerRect.top + 120

        // Find which DOM user node is active
        let domActiveIndex = 0
        for (let i = 0; i < userNodes.length; i++) {
          const node = userNodes[i]
          if (!node) continue
          const rect = node.getBoundingClientRect()
          if (rect.top <= triggerY) {
            domActiveIndex = i
          } else {
            break
          }
        }

        const activeDomNode = userNodes[domActiveIndex]
        if (activeDomNode) {
          const activeText = getQuestionTextFromNode(activeDomNode).replace(/\s+/g, '')
          let matchedQuestionIndex = -1
          if (activeText.length > 0) {
            matchedQuestionIndex = questions.findIndex(q => {
              const qText = q.text.replace(/\s+/g, '')
              return qText && (qText.includes(activeText.slice(0, 20)) || activeText.includes(qText.slice(0, 20)))
            })
          }

          if (matchedQuestionIndex < 0) {
            const offsetFromEnd = userNodes.length - 1 - domActiveIndex
            matchedQuestionIndex = Math.max(0, questions.length - 1 - offsetFromEnd)
          }

          setActiveIndex(matchedQuestionIndex)
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [questions])

  // Hover handlers with debounce for smooth transitions. They are disabled on
  // touch layouts so a synthetic mouseleave cannot close a panel just opened by tap.
  const handleMouseEnter = useCallback((): void => {
    if (isMobile) return
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setIsExpanded(true)
  }, [isMobile])

  const handleMouseLeave = useCallback((): void => {
    if (isMobile) return
    if (hoverTimerRef.current !== null) {
      clearTimeout(hoverTimerRef.current)
    }
    hoverTimerRef.current = setTimeout(() => {
      setIsExpanded(false)
    }, 350)
  }, [isMobile])

  const triggerHighlight = useCallback((targetNode: HTMLElement): void => {
    if (highlightTimerRef.current !== null) {
      clearTimeout(highlightTimerRef.current)
    }

    const bubbleEl = targetNode.querySelector<HTMLElement>('[class*="bubble"]') || targetNode
    requestAnimationFrame(() => {
      bubbleEl.classList.remove(styles['highlightTarget'] ?? '')
      requestAnimationFrame(() => {
        bubbleEl.classList.add(styles['highlightTarget'] ?? '')
      })
    })

    highlightTimerRef.current = setTimeout(() => {
      bubbleEl.classList.remove(styles['highlightTarget'] ?? '')
    }, 1800)
  }, [])

  const scrollToTop = useCallback((): void => {
    const convScroller = document.querySelector<HTMLElement>('[data-conversation-scroll]')
    const scroller = (convScroller && convScroller.scrollHeight > convScroller.clientHeight)
      ? convScroller
      : findActualScroller()
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const scrollToBottom = useCallback((): void => {
    const convScroller = document.querySelector<HTMLElement>('[data-conversation-scroll]')
    const scroller = (convScroller && convScroller.scrollHeight > convScroller.clientHeight)
      ? convScroller
      : findActualScroller()
    if (scroller) {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' })
    }
  }, [])

  // Quick jump to specific question with pagination auto-load and accurate targeting
  const jumpToQuestion = useCallback((question: QuestionItem, index: number): void => {
    // 1. Try to find the element in current DOM
    const directNode = findElementForQuestion(question, questions)
    if (directNode) {
      performScrollTo(directNode)
      triggerHighlight(directNode)
      setActiveIndex(index)
      return
    }

    // 2. If not yet in DOM (in unpaged earlier history), auto-load older pages and jump
    void loadOlderUntilFound(question, questions).then((foundNode) => {
      if (foundNode) {
        performScrollTo(foundNode)
        triggerHighlight(foundNode)
        setActiveIndex(index)
      } else {
        scrollToTop()
        setActiveIndex(index)
      }
    })
  }, [questions, scrollToTop, triggerHighlight])

  // If there are no questions or chat is not currently in view, don't render
  if (questions.length === 0 || !chatInView) {
    return null
  }

  // Pre-calculate line widths for the collapsed mini-lines
  const maxDisplayLines = 14
  const visibleLines = questions.slice(0, maxDisplayLines)
  const hasMoreLines = questions.length > maxDisplayLines

  const content = (
    <div
      className={styles['navContainer']}
      style={{ right: `${String(posRight)}px` }}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      {!isExpanded ? (
        <button
          type="button"
          className={styles['collapsedWidget']}
          title={`对话目录（共 ${String(questions.length)} 个提问）`}
          aria-label={`打开对话目录，共 ${String(questions.length)} 个提问`}
          aria-expanded={false}
          onClick={() => { setIsExpanded(true) }}
        >
          {visibleLines.map((q, idx) => {
            const lineWidth = [14, 18, 12, 20, 16][idx % 5] ?? 16
            const isActive = idx === activeIndex
            return (
              <div
                key={q.id}
                className={`${styles['miniLine']} ${isActive ? styles['activeLine'] ?? '' : ''}`}
                style={{ width: `${String(isActive ? 20 : lineWidth)}px` }}
              />
            )
          })}
          {hasMoreLines && (
            <div className={styles['moreDots']}>
              <span className={styles['moreDot']} />
              <span className={styles['moreDot']} />
              <span className={styles['moreDot']} />
            </div>
          )}
        </button>
      ) : (
        <div
          className={styles['expandedCard']}
          role="dialog"
          aria-label="历史提问"
          onMouseEnter={isMobile ? undefined : handleMouseEnter}
          onMouseLeave={isMobile ? undefined : handleMouseLeave}
        >
          <div className={styles['cardHeader']}>
            <div className={styles['headerLeft']}>
              <span className={styles['headerIcon']} aria-hidden>
                <CompassIcon />
              </span>
              <span className={styles['headerTitle']}>历史提问</span>
              <span className={styles['countBadge']}>{questions.length} 条</span>
            </div>
            <div className={styles['headerActions']}>
              <button
                type="button"
                className={styles['navButton']}
                title="跳转到顶部"
                aria-label="跳转到顶部"
                onClick={scrollToTop}
              >
                <ArrowUpIcon />
              </button>
              <button
                type="button"
                className={styles['navButton']}
                title="跳转到底部"
                aria-label="跳转到底部"
                onClick={scrollToBottom}
              >
                <ArrowDownIcon />
              </button>
              <button
                type="button"
                className={`${styles['navButton']} ${styles['mobileCloseButton'] ?? ''}`}
                title="关闭对话目录"
                aria-label="关闭对话目录"
                onClick={() => { setIsExpanded(false) }}
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div ref={listContainerRef} className={styles['questionList']}>
            {questions.map((q, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={q.id}
                  type="button"
                  data-active={isActive ? 'true' : undefined}
                  className={`${styles['questionItem']} ${isActive ? styles['activeItem'] ?? '' : ''}`}
                  title={`第 ${String(idx + 1)} 个提问：${q.text}`}
                  onClick={() => {
                    jumpToQuestion(q, idx)
                    // Return the conversation to full width after a touch selection.
                    if (isMobile) setIsExpanded(false)
                  }}
                >
                  <span className={styles['indexBadge']}>#{idx + 1}</span>
                  <div className={styles['itemContent']}>
                    <span className={styles['itemText']}>{q.text}</span>
                    {q.time ? (
                      <span className={styles['itemTime']}>{formatTime(q.time)}</span>
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  return createPortal(content, document.body)
}
