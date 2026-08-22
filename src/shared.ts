/**
 * Data contract for the quick-jump sidebar.
 *
 * The widget runs in two modes:
 *  - **Data mode**: a host/controller feeds `messages` / `retryableTurns`
 *    (authoritative, derived from durable session events) — this gives exact
 *    turn numbers and timestamps.
 *  - **DOM mode** (the standalone default): both are empty and the widget
 *    derives its question list from the live conversation DOM.
 *
 * The shapes below mirror `dsh-message-edit`'s `EditableMessageBlock` /
 * `RetryableTurn` so a data feed can be wired in later without changing the
 * widget. Only the fields the widget reads are required.
 */

/** User-visible text-bearing block classification. */
export type EditableBlockKind = 'user' | 'assistant.reasoning' | 'assistant.response'

/** One text-bearing block the sidebar can list (user blocks are the questions). */
export interface EditableMessageBlock {
  key: string
  turn: number
  kind: EditableBlockKind
  text: string
  time: number
}

/** One completed user turn, as a question-list fallback source. */
export interface RetryableTurn {
  turn: number
  preview: string
  time: number
}
