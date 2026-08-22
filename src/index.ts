/**
 * Host half of Chat Jump: intentionally empty.
 *
 * The quick-jump sidebar is a pure browser widget (see `./client`). It needs no
 * server-side services, so the host bundle only carries plugin identity so the
 * Cordis container can register it alongside the client bundle. If DSH gains
 * first-class client-only plugin support, this file (and `dsh.bundle`) can be
 * removed.
 */
import type { Context } from '@deepseek-ai/cordis'

/** Stable Cordis plugin name. */
export const name = 'chat-jump'

/** The widget is client-side only: the host injects nothing. */
export const inject = []

/** No host-side effects to install. */
export function apply(_ctx: Context): void {}
