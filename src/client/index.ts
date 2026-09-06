/** Chat Jump browser half: a floating quick-jump / table-of-contents sidebar. */
import type { Context } from '@deepseek-ai/cordis'
// The renderer owns the slots service's Context augmentation.
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Referencing the conversation client module loads its SlotMap declaration
// merging (the `conversation.*` slot contracts) into this program. Type-only.
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import { ChatJumpSlot } from './ChatJumpSlot.tsx'

/** Services the client bundle may read from the conversation context. */
export const inject = ['slots', 'conversation']

/** Register the floating quick-jump widget into the conversation header. */
export function apply(ctx: Context): void {
  ctx.slots.register({
    name: 'conversation.session.header.actions',
    id: 'chat-jump-widget',
    order: 50,
  }, ChatJumpSlot)
}
