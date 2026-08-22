import type { ReactNode } from 'react'
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import { ChatHistoryQuickJump } from './ChatHistoryQuickJump.tsx'

type ChatJumpSlotProps = PropsRuntime<'conversation.session.header.actions'>

/**
 * Slot contribution mounting the floating quick-jump sidebar.
 *
 * The widget portals itself to `document.body`, so this contribution renders
 * nothing visible in the header — it only provides a per-conversation mount
 * point. It operates in DOM-only mode (no data feed): the widget derives its
 * question list from the live conversation DOM.
 */
export function ChatJumpSlot(_props: ChatJumpSlotProps): ReactNode {
  return <ChatHistoryQuickJump />
}
