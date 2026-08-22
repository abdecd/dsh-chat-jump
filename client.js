window.__ModuleLoader__.load({
	id: "dsh-chat-jump",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_dom = require("react-dom");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-css:/run/media/user1/78E6859DE6855BEE/code/js/dsh-chat-jump/src/client/ChatHistoryQuickJump.module.css.mjs
		const css = "._8fFqXG_navContainer{z-index:25;user-select:none;pointer-events:auto;font-family:inherit;position:fixed;top:50%;transform:translateY(-50%)}._8fFqXG_collapsedWidget{background:var(--dsw-alias-bg-module-platform,#1c1c22d9);-webkit-backdrop-filter:blur(16px);border:1px solid var(--dsw-alias-border-l2,#ffffff14);cursor:pointer;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;gap:3.5px;min-width:28px;padding:8px 6px;transition:all .22s cubic-bezier(.16,1,.3,1);display:flex;box-shadow:0 2px 8px #00000014,0 1px 2px #0000000a}._8fFqXG_collapsedWidget:hover{border-color:var(--dsw-alias-brand-primary,#4d6bfe);transform:scale(1.04);box-shadow:0 4px 14px #0000001f,0 0 6px #4d6bfe26}._8fFqXG_miniLine{background:var(--dsw-alias-label-tertiary,#ffffff40);pointer-events:none;border-radius:2px;height:2.5px;transition:all .2s cubic-bezier(.16,1,.3,1)}._8fFqXG_miniLine._8fFqXG_activeLine{background:var(--dsw-alias-brand-primary,#4d6bfe);height:3.5px;box-shadow:0 0 5px #4d6bfe73;width:20px!important}._8fFqXG_moreDots{justify-content:center;align-items:center;gap:2px;margin-top:2px;display:flex}._8fFqXG_moreDot{background:var(--dsw-alias-label-tertiary,#ffffff4d);border-radius:50%;width:2.5px;height:2.5px}._8fFqXG_expandedCard{background:var(--dsw-alias-bg-module-platform,#18181ef0);-webkit-backdrop-filter:blur(20px);border:1px solid var(--dsw-alias-border-l2,#ffffff1a);border-radius:14px;flex-direction:column;width:300px;max-height:480px;animation:.22s cubic-bezier(.16,1,.3,1) _8fFqXG_expandIn;display:flex;position:absolute;top:50%;right:0;overflow:hidden;transform:translateY(-50%);box-shadow:0 6px 20px #0000001f,0 2px 6px #0000000f}@keyframes _8fFqXG_expandIn{0%{opacity:0;transform:translateY(-50%)scale(.94)translate(10px)}to{opacity:1;transform:translateY(-50%)scale(1)translate(0)}}._8fFqXG_cardHeader{border-bottom:1px solid var(--dsw-alias-border-l2,#ffffff1a);background:#ffffff05;justify-content:space-between;align-items:center;padding:11px 14px;display:flex}._8fFqXG_headerLeft{align-items:center;gap:7px;display:flex}._8fFqXG_headerIcon{color:var(--dsw-alias-brand-primary,#4d6bfe);align-items:center;display:flex}._8fFqXG_headerTitle{color:var(--dsw-alias-label-primary,#fff);font-size:13px;font-weight:600;line-height:18px}._8fFqXG_countBadge{color:var(--dsw-alias-label-secondary,#ffffffb3);background:var(--dsw-alias-bg-layer-1,#ffffff14);border-radius:10px;padding:1px 6px;font-size:10px;font-weight:500}._8fFqXG_headerActions{align-items:center;gap:4px;display:flex}._8fFqXG_navButton{border:1px solid var(--dsw-alias-border-l2,#ffffff1a);background:var(--dsw-alias-bg-layer-1,#ffffff0d);width:24px;height:24px;color:var(--dsw-alias-label-secondary,#ffffffb3);cursor:pointer;border-radius:6px;justify-content:center;align-items:center;padding:0;transition:all .15s;display:inline-flex}._8fFqXG_navButton:hover{background:var(--dsw-alias-bg-module-hover,#ffffff1f);color:var(--dsw-alias-label-primary,#fff);border-color:var(--dsw-alias-border-l3,#fff3)}._8fFqXG_questionList{flex-direction:column;gap:4px;max-height:400px;padding:6px;display:flex;overflow:hidden auto}._8fFqXG_questionList::-webkit-scrollbar{width:5px}._8fFqXG_questionList::-webkit-scrollbar-track{background:0 0}._8fFqXG_questionList::-webkit-scrollbar-thumb{background:var(--dsw-alias-border-l2,#ffffff26);border-radius:4px}._8fFqXG_questionList::-webkit-scrollbar-thumb:hover{background:var(--dsw-alias-border-l3,#ffffff4d)}._8fFqXG_questionItem{text-align:left;cursor:pointer;box-sizing:border-box;background:0 0;border:1px solid #0000;border-radius:9px;align-items:flex-start;gap:8px;width:100%;padding:8px 10px;transition:all .15s cubic-bezier(.16,1,.3,1);display:flex}._8fFqXG_questionItem:hover{background:var(--dsw-alias-bg-module-hover,#ffffff12);border-color:var(--dsw-alias-border-l2,#ffffff1f);transform:translate(-2px)}._8fFqXG_questionItem._8fFqXG_activeItem{background:#4d6bfe1f;border-color:#4d6bfe59}._8fFqXG_indexBadge{background:var(--dsw-alias-bg-layer-1,#ffffff14);color:var(--dsw-alias-label-secondary,#ffffffb3);border-radius:6px;flex:none;padding:2px 6px;font-size:11px;font-weight:600;line-height:16px;transition:all .15s}._8fFqXG_activeItem ._8fFqXG_indexBadge{background:var(--dsw-alias-brand-primary,#4d6bfe);color:#fff;box-shadow:0 0 8px #4d6bfe80}._8fFqXG_itemContent{flex-direction:column;flex:1;gap:2px;min-width:0;display:flex}._8fFqXG_itemText{color:var(--dsw-alias-label-secondary,#ffffffbf);-webkit-line-clamp:2;text-overflow:ellipsis;word-break:break-word;-webkit-box-orient:vertical;font-size:12px;line-height:18px;transition:color .15s;display:-webkit-box;overflow:hidden}._8fFqXG_questionItem:hover ._8fFqXG_itemText{color:var(--dsw-alias-label-primary,#fff)}._8fFqXG_activeItem ._8fFqXG_itemText{color:var(--dsw-alias-label-primary,#fff);font-weight:500}._8fFqXG_itemTime{color:var(--dsw-alias-label-tertiary,#fff6);font-size:10px;line-height:14px}._8fFqXG_highlightTarget{animation:1.8s cubic-bezier(.16,1,.3,1) forwards _8fFqXG_jumpTargetPulse!important}@keyframes _8fFqXG_jumpTargetPulse{0%{outline:2.5px solid var(--dsw-alias-brand-primary,#4d6bfe);border-radius:12px;box-shadow:0 0 24px #4d6bfeb3}60%{outline:2px solid var(--dsw-alias-brand-primary,#4d6bfe);border-radius:12px;box-shadow:0 0 14px #4d6bfe59}to{box-shadow:none;outline:2px solid #0000}}@media (width<=768px){._8fFqXG_expandedCard{width:min(280px,100vw - 28px)}}";
		const tagId = "dsh-chat-jump/ChatHistoryQuickJump.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-chat-jump";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var ChatHistoryQuickJump_module_css_default = {
			"moreDots": "_8fFqXG_moreDots",
			"collapsedWidget": "_8fFqXG_collapsedWidget",
			"navButton": "_8fFqXG_navButton",
			"questionList": "_8fFqXG_questionList",
			"activeItem": "_8fFqXG_activeItem",
			"expandIn": "_8fFqXG_expandIn",
			"questionItem": "_8fFqXG_questionItem",
			"navContainer": "_8fFqXG_navContainer",
			"itemText": "_8fFqXG_itemText",
			"headerActions": "_8fFqXG_headerActions",
			"moreDot": "_8fFqXG_moreDot",
			"headerLeft": "_8fFqXG_headerLeft",
			"expandedCard": "_8fFqXG_expandedCard",
			"indexBadge": "_8fFqXG_indexBadge",
			"highlightTarget": "_8fFqXG_highlightTarget",
			"countBadge": "_8fFqXG_countBadge",
			"itemContent": "_8fFqXG_itemContent",
			"headerIcon": "_8fFqXG_headerIcon",
			"itemTime": "_8fFqXG_itemTime",
			"jumpTargetPulse": "_8fFqXG_jumpTargetPulse",
			"cardHeader": "_8fFqXG_cardHeader",
			"miniLine": "_8fFqXG_miniLine",
			"activeLine": "_8fFqXG_activeLine",
			"headerTitle": "_8fFqXG_headerTitle"
		};
		//#endregion
		//#region src/client/ChatHistoryQuickJump.tsx
		function formatTime(timestamp) {
			if (!timestamp) return "";
			const date = new Date(timestamp);
			return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
		}
		function cleanQuestionText(text) {
			return text.replace(/^#+\s+/gm, "").replace(/```[\s\S]*?```/g, "[代码]").replace(/`([^`]+)`/g, "$1").replace(/\s+/g, " ").trim();
		}
		/** Outline / Compass SVG Icon */
		function CompassIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8 13.2C5.13 13.2 2.8 10.87 2.8 8C2.8 5.13 5.13 2.8 8 2.8C10.87 2.8 13.2 5.13 13.2 8C13.2 10.87 10.87 13.2 8 13.2ZM10.5 5.5L6.5 7.5L5.5 10.5L9.5 8.5L10.5 5.5Z",
					fill: "currentColor"
				})
			});
		}
		/** Arrow Up Icon */
		function ArrowUpIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "13",
				height: "13",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 3.5L3.5 8L4.55 9.05L7.25 6.35V12.5H8.75V6.35L11.45 9.05L12.5 8L8 3.5Z",
					fill: "currentColor"
				})
			});
		}
		/** Arrow Down Icon */
		function ArrowDownIcon() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: "13",
				height: "13",
				viewBox: "0 0 16 16",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
					d: "M8 12.5L12.5 8L11.45 6.95L8.75 9.65V3.5H7.25V9.65L4.55 6.95L3.5 8L8 12.5Z",
					fill: "currentColor"
				})
			});
		}
		/** Find the true scrolling container of the conversation (marked by data-conversation-scroll or overflowing ancestor) */
		function findActualScroller(targetEl) {
			if (targetEl) {
				let el = targetEl;
				while (el && el !== document.body && el !== document.documentElement) {
					if (el.hasAttribute("data-conversation-scroll")) return el;
					const overflowY = window.getComputedStyle(el).overflowY;
					if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) return el;
					el = el.parentElement;
				}
			}
			const conversationScroller = document.querySelector("[data-conversation-scroll]");
			if (conversationScroller) return conversationScroller;
			const chatFlow = document.querySelector("[data-chat-flow]");
			if (chatFlow?.parentElement && chatFlow.parentElement.scrollHeight > chatFlow.parentElement.clientHeight) return chatFlow.parentElement;
			return document.scrollingElement || document.documentElement;
		}
		/** Find all genuine user input flow items in the DOM in exact render order (excluding context, artifacts, commands, compactions) */
		function getUserElements() {
			const chatFlow = document.querySelector("[data-chat-flow]");
			if (!chatFlow) return [];
			const userFlowItems = Array.from(chatFlow.querySelectorAll("[data-chat-flow-kind=\"user\"]"));
			if (userFlowItems.length > 0) return userFlowItems;
			return Array.from(chatFlow.querySelectorAll("[class*=\"userRow\"]:not([class*=\"contextRow\"])"));
		}
		/** Extract text from a user message DOM node */
		function getQuestionTextFromNode(node) {
			const bubble = node.querySelector("[class*=\"bubble\"]");
			return cleanQuestionText(bubble ? bubble.textContent ?? "" : node.textContent ?? "");
		}
		/** Find target DOM node with multi-stage matching */
		/** Find corresponding DOM element for a question across pagination states */
		function findElementForQuestion(q, allQuestions) {
			if (!document.querySelector("[data-chat-flow]")) return null;
			const userElements = getUserElements();
			if (userElements.length === 0) return null;
			const qClean = q.text.slice(0, 30).replace(/\s+/g, "");
			if (qClean.length > 0) for (const el of userElements) {
				const elText = getQuestionTextFromNode(el).replace(/\s+/g, "");
				if (elText && (elText.includes(qClean) || qClean.includes(elText.slice(0, 20)))) return el;
			}
			if (userElements.length === allQuestions.length) {
				const qIndex = allQuestions.findIndex((item) => item.id === q.id);
				if (qIndex >= 0 && userElements[qIndex]) return userElements[qIndex];
			}
			const qIndexFromEnd = allQuestions.length - 1 - allQuestions.findIndex((item) => item.id === q.id);
			const elIndex = userElements.length - 1 - qIndexFromEnd;
			if (elIndex >= 0 && elIndex < userElements.length && userElements[elIndex]) {
				const elText = getQuestionTextFromNode(userElements[elIndex]);
				if (!q.text || !elText || elText.includes(q.text.slice(0, 16)) || q.text.includes(elText.slice(0, 16))) return userElements[elIndex];
			}
			return null;
		}
		/** Automatically trigger "加载更早" (load older) if target question is in unpaged history */
		async function loadOlderUntilFound(targetQuestion, allQuestions, maxAttempts = 5) {
			let attempts = 0;
			while (attempts < maxAttempts) {
				const el = findElementForQuestion(targetQuestion, allQuestions);
				if (el) return el;
				const loadOlderBtn = document.querySelector("[class*=\"older\"] button:not(:disabled)");
				if (!loadOlderBtn) break;
				loadOlderBtn.click();
				await new Promise((resolve) => {
					const chatFlow = document.querySelector("[data-chat-flow]");
					if (!chatFlow) {
						setTimeout(resolve, 300);
						return;
					}
					const obs = new MutationObserver(() => {
						obs.disconnect();
						resolve();
					});
					obs.observe(chatFlow, {
						childList: true,
						subtree: true
					});
					setTimeout(() => {
						obs.disconnect();
						resolve();
					}, 700);
				});
				attempts += 1;
			}
			return findElementForQuestion(targetQuestion, allQuestions);
		}
		/** Execute smooth scroll to target message element */
		function performScrollTo(targetNode) {
			const convScroller = document.querySelector("[data-conversation-scroll]");
			const scrollWrapper = document.querySelector("[data-chat-flow]")?.parentElement;
			let scroller = null;
			if (convScroller && convScroller.scrollHeight > convScroller.clientHeight) scroller = convScroller;
			else if (scrollWrapper && scrollWrapper.scrollHeight > scrollWrapper.clientHeight) scroller = scrollWrapper;
			else scroller = findActualScroller(targetNode);
			if (scroller && scroller.scrollHeight > scroller.clientHeight) {
				const scrollerRect = scroller.getBoundingClientRect();
				const targetRect = targetNode.getBoundingClientRect();
				const targetTop = Math.max(0, scroller.scrollTop + (targetRect.top - scrollerRect.top) - 20);
				if (scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <= 40 && targetTop < scroller.scrollTop) {
					scroller.scrollTop = Math.max(0, scroller.scrollTop - 35);
					scroller.dispatchEvent(new Event("scroll"));
				}
				scroller.scrollTo({
					top: targetTop,
					behavior: "smooth"
				});
			} else try {
				targetNode.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			} catch {}
		}
		function ChatHistoryQuickJump({ messages = [], retryableTurns = [] }) {
			const [isExpanded, setIsExpanded] = (0, react.useState)(false);
			const [activeIndex, setActiveIndex] = (0, react.useState)(0);
			const [posRight, setPosRight] = (0, react.useState)(20);
			const [chatInView, setChatInView] = (0, react.useState)(false);
			const [domVersion, setDomVersion] = (0, react.useState)(0);
			const listContainerRef = (0, react.useRef)(null);
			const hoverTimerRef = (0, react.useRef)(null);
			const highlightTimerRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				return () => {
					if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
					if (highlightTimerRef.current !== null) clearTimeout(highlightTimerRef.current);
				};
			}, []);
			(0, react.useEffect)(() => {
				let flowObserver = null;
				let rafId = null;
				const scheduleDomUpdate = () => {
					if (rafId !== null) return;
					rafId = requestAnimationFrame(() => {
						rafId = null;
						setDomVersion((v) => v + 1);
					});
				};
				const attachFlowObserver = () => {
					flowObserver?.disconnect();
					const chatFlow = document.querySelector("[data-chat-flow]");
					if (chatFlow) {
						flowObserver = new MutationObserver(scheduleDomUpdate);
						flowObserver.observe(chatFlow, {
							childList: true,
							subtree: true,
							characterData: true
						});
					}
				};
				attachFlowObserver();
				const bodyObserver = new MutationObserver(() => {
					attachFlowObserver();
					scheduleDomUpdate();
				});
				bodyObserver.observe(document.body, {
					childList: true,
					subtree: true
				});
				return () => {
					if (rafId !== null) cancelAnimationFrame(rafId);
					flowObserver?.disconnect();
					bodyObserver.disconnect();
				};
			}, []);
			const questions = (0, react.useMemo)(() => {
				const userMsgs = messages.filter((m) => m.kind === "user" && m.text.trim().length > 0);
				const userTurns = retryableTurns.filter((t) => t.preview.trim().length > 0);
				if (userMsgs.length > 0 || userTurns.length > 0) {
					const list = [];
					const seenTurns = /* @__PURE__ */ new Set();
					for (const msg of userMsgs) if (!seenTurns.has(msg.turn)) {
						seenTurns.add(msg.turn);
						list.push({
							id: msg.key,
							turn: msg.turn,
							text: cleanQuestionText(msg.text),
							time: msg.time
						});
					}
					if (list.length === 0 && userTurns.length > 0) for (const rt of userTurns) list.push({
						id: `turn-${String(rt.turn)}`,
						turn: rt.turn,
						text: cleanQuestionText(rt.preview),
						time: rt.time
					});
					return list;
				}
				return getUserElements().map((node, idx) => {
					const text = getQuestionTextFromNode(node);
					return {
						id: node.dataset.chatFlowKey || node.dataset.chatAnchorKey || `user-node-${String(idx)}`,
						turn: idx + 1,
						text: text || `提问 #${String(idx + 1)}`
					};
				});
			}, [
				messages,
				retryableTurns,
				domVersion
			]);
			const prevExpandedRef = (0, react.useRef)(false);
			(0, react.useEffect)(() => {
				if (isExpanded && !prevExpandedRef.current) requestAnimationFrame(() => {
					const container = listContainerRef.current;
					if (!container) return;
					const activeEl = container.querySelector(`button[data-active="true"]`) || container.children[activeIndex];
					if (activeEl) {
						const containerHeight = container.clientHeight;
						const activeTop = activeEl.offsetTop;
						const activeHeight = activeEl.offsetHeight;
						container.scrollTop = Math.max(0, activeTop - containerHeight / 2 + activeHeight / 2);
					}
				});
				prevExpandedRef.current = isExpanded;
			}, [isExpanded, activeIndex]);
			(0, react.useEffect)(() => {
				let rafId = null;
				const updatePosition = () => {
					if (!document.querySelector("[data-chat-flow]")) {
						setChatInView(false);
						return;
					}
					setChatInView(true);
					const scroller = findActualScroller();
					if (scroller) {
						const rect = scroller.getBoundingClientRect();
						const offset = Math.max(16, window.innerWidth - rect.right + 18);
						setPosRight(offset);
					} else setPosRight(20);
				};
				const scheduleUpdatePosition = () => {
					if (rafId !== null) return;
					rafId = requestAnimationFrame(() => {
						rafId = null;
						updatePosition();
					});
				};
				updatePosition();
				window.addEventListener("resize", scheduleUpdatePosition);
				const observer = new MutationObserver(scheduleUpdatePosition);
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
				return () => {
					if (rafId !== null) cancelAnimationFrame(rafId);
					window.removeEventListener("resize", scheduleUpdatePosition);
					observer.disconnect();
				};
			}, []);
			(0, react.useEffect)(() => {
				const getActiveScroller = () => {
					const convScroller = document.querySelector("[data-conversation-scroll]");
					if (convScroller && convScroller.scrollHeight > convScroller.clientHeight) return convScroller;
					return findActualScroller();
				};
				let ticking = false;
				const onScroll = () => {
					if (ticking) return;
					ticking = true;
					requestAnimationFrame(() => {
						ticking = false;
						const scroller = getActiveScroller();
						if (!scroller || questions.length === 0) return;
						const userNodes = getUserElements();
						if (userNodes.length === 0) return;
						const scrollerRect = scroller.getBoundingClientRect();
						if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 24) {
							setActiveIndex(questions.length - 1);
							return;
						}
						const triggerY = scrollerRect.top + 120;
						let domActiveIndex = 0;
						for (let i = 0; i < userNodes.length; i++) {
							const node = userNodes[i];
							if (!node) continue;
							if (node.getBoundingClientRect().top <= triggerY) domActiveIndex = i;
							else break;
						}
						const activeDomNode = userNodes[domActiveIndex];
						if (activeDomNode) {
							const activeText = getQuestionTextFromNode(activeDomNode).replace(/\s+/g, "");
							let matchedQuestionIndex = -1;
							if (activeText.length > 0) matchedQuestionIndex = questions.findIndex((q) => {
								const qText = q.text.replace(/\s+/g, "");
								return qText && (qText.includes(activeText.slice(0, 20)) || activeText.includes(qText.slice(0, 20)));
							});
							if (matchedQuestionIndex < 0) {
								const offsetFromEnd = userNodes.length - 1 - domActiveIndex;
								matchedQuestionIndex = Math.max(0, questions.length - 1 - offsetFromEnd);
							}
							setActiveIndex(matchedQuestionIndex);
						}
					});
				};
				window.addEventListener("scroll", onScroll, {
					passive: true,
					capture: true
				});
				onScroll();
				return () => {
					window.removeEventListener("scroll", onScroll, { capture: true });
				};
			}, [questions]);
			const handleMouseEnter = (0, react.useCallback)(() => {
				if (hoverTimerRef.current !== null) {
					clearTimeout(hoverTimerRef.current);
					hoverTimerRef.current = null;
				}
				setIsExpanded(true);
			}, []);
			const handleMouseLeave = (0, react.useCallback)(() => {
				if (hoverTimerRef.current !== null) clearTimeout(hoverTimerRef.current);
				hoverTimerRef.current = setTimeout(() => {
					setIsExpanded(false);
				}, 350);
			}, []);
			const triggerHighlight = (0, react.useCallback)((targetNode) => {
				if (highlightTimerRef.current !== null) clearTimeout(highlightTimerRef.current);
				const bubbleEl = targetNode.querySelector("[class*=\"bubble\"]") || targetNode;
				requestAnimationFrame(() => {
					bubbleEl.classList.remove(ChatHistoryQuickJump_module_css_default["highlightTarget"] ?? "");
					requestAnimationFrame(() => {
						bubbleEl.classList.add(ChatHistoryQuickJump_module_css_default["highlightTarget"] ?? "");
					});
				});
				highlightTimerRef.current = setTimeout(() => {
					bubbleEl.classList.remove(ChatHistoryQuickJump_module_css_default["highlightTarget"] ?? "");
				}, 1800);
			}, []);
			const scrollToTop = (0, react.useCallback)(() => {
				const convScroller = document.querySelector("[data-conversation-scroll]");
				const scroller = convScroller && convScroller.scrollHeight > convScroller.clientHeight ? convScroller : findActualScroller();
				if (scroller) scroller.scrollTo({
					top: 0,
					behavior: "smooth"
				});
			}, []);
			const scrollToBottom = (0, react.useCallback)(() => {
				const convScroller = document.querySelector("[data-conversation-scroll]");
				const scroller = convScroller && convScroller.scrollHeight > convScroller.clientHeight ? convScroller : findActualScroller();
				if (scroller) scroller.scrollTo({
					top: scroller.scrollHeight,
					behavior: "smooth"
				});
			}, []);
			const jumpToQuestion = (0, react.useCallback)((question, index) => {
				const directNode = findElementForQuestion(question, questions);
				if (directNode) {
					performScrollTo(directNode);
					triggerHighlight(directNode);
					setActiveIndex(index);
					return;
				}
				loadOlderUntilFound(question, questions).then((foundNode) => {
					if (foundNode) {
						performScrollTo(foundNode);
						triggerHighlight(foundNode);
						setActiveIndex(index);
					} else {
						scrollToTop();
						setActiveIndex(index);
					}
				});
			}, [
				questions,
				scrollToTop,
				triggerHighlight
			]);
			if (questions.length === 0 || !chatInView) return null;
			const maxDisplayLines = 14;
			const visibleLines = questions.slice(0, maxDisplayLines);
			const hasMoreLines = questions.length > maxDisplayLines;
			const content = /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: ChatHistoryQuickJump_module_css_default["navContainer"],
				style: { right: `${String(posRight)}px` },
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				children: !isExpanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ChatHistoryQuickJump_module_css_default["collapsedWidget"],
					title: `对话目录（共 ${String(questions.length)} 个提问）`,
					onClick: () => {
						setIsExpanded(true);
					},
					children: [visibleLines.map((q, idx) => {
						const lineWidth = [
							14,
							18,
							12,
							20,
							16
						][idx % 5] ?? 16;
						const isActive = idx === activeIndex;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: `${ChatHistoryQuickJump_module_css_default["miniLine"]} ${isActive ? ChatHistoryQuickJump_module_css_default["activeLine"] ?? "" : ""}`,
							style: { width: `${String(isActive ? 20 : lineWidth)}px` }
						}, q.id);
					}), hasMoreLines && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ChatHistoryQuickJump_module_css_default["moreDots"],
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: ChatHistoryQuickJump_module_css_default["moreDot"] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: ChatHistoryQuickJump_module_css_default["moreDot"] }),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: ChatHistoryQuickJump_module_css_default["moreDot"] })
						]
					})]
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ChatHistoryQuickJump_module_css_default["expandedCard"],
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: ChatHistoryQuickJump_module_css_default["cardHeader"],
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ChatHistoryQuickJump_module_css_default["headerLeft"],
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ChatHistoryQuickJump_module_css_default["headerIcon"],
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CompassIcon, {})
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ChatHistoryQuickJump_module_css_default["headerTitle"],
									children: "历史提问"
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: ChatHistoryQuickJump_module_css_default["countBadge"],
									children: [questions.length, " 条"]
								})
							]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ChatHistoryQuickJump_module_css_default["headerActions"],
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ChatHistoryQuickJump_module_css_default["navButton"],
								title: "跳转到顶部",
								"aria-label": "跳转到顶部",
								onClick: scrollToTop,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArrowUpIcon, {})
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: ChatHistoryQuickJump_module_css_default["navButton"],
								title: "跳转到底部",
								"aria-label": "跳转到底部",
								onClick: scrollToBottom,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ArrowDownIcon, {})
							})]
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: listContainerRef,
						className: ChatHistoryQuickJump_module_css_default["questionList"],
						children: questions.map((q, idx) => {
							const isActive = idx === activeIndex;
							return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								"data-active": isActive ? "true" : void 0,
								className: `${ChatHistoryQuickJump_module_css_default["questionItem"]} ${isActive ? ChatHistoryQuickJump_module_css_default["activeItem"] ?? "" : ""}`,
								title: `第 ${String(idx + 1)} 个提问：${q.text}`,
								onClick: () => {
									jumpToQuestion(q, idx);
								},
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
									className: ChatHistoryQuickJump_module_css_default["indexBadge"],
									children: ["#", idx + 1]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: ChatHistoryQuickJump_module_css_default["itemContent"],
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: ChatHistoryQuickJump_module_css_default["itemText"],
										children: q.text
									}), q.time ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: ChatHistoryQuickJump_module_css_default["itemTime"],
										children: formatTime(q.time)
									}) : null]
								})]
							}, q.id);
						})
					})]
				})
			});
			return (0, react_dom.createPortal)(content, document.body);
		}
		//#endregion
		//#region src/client/ChatJumpSlot.tsx
		/**
		* Slot contribution mounting the floating quick-jump sidebar.
		*
		* The widget portals itself to `document.body`, so this contribution renders
		* nothing visible in the header — it only provides a per-conversation mount
		* point. It operates in DOM-only mode (no data feed): the widget derives its
		* question list from the live conversation DOM.
		*/
		function ChatJumpSlot(_props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChatHistoryQuickJump, {});
		}
		//#endregion
		//#region src/client/index.ts
		/** Services the client bundle may read from the conversation context. */
		const inject = ["slots", "conversation"];
		/** Register the floating quick-jump widget into the conversation header. */
		function apply(ctx) {
			ctx.slots.register({
				name: "conversation.session.header.actions",
				id: "chat-jump-widget",
				order: 50
			}, ChatJumpSlot);
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map