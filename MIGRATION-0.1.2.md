# DSH 0.1.2 migration

## Identity and baseline

- Repository: dsh-chat-jump, main, baseline HEAD 16162363174d09a559840b7af60819eb28708804.
- Plugin version remains 0.1.0; no publish or release-version change performed.
- Declared/resolved DSH development cohort: 0.1.0-rc.8 → 0.1.2-rc.1.
- Node v26.8.1, pnpm 11.23.0; registry dependencies with pnpm-lock.yaml.
- Existing modified client.js was explicitly authorized for regeneration.
- Baseline pnpm run build (including tsc) passed. No existing test script.
- Supplied cards cover 0.1.1-rc.2 onward; the earlier 0.1.0-rc.8 → 0.1.1-rc.2 segment is not fully carded. Target compilation and artifact assertions cover the consumed slot registration contract, not every historical change.

## Changes

- package.json: removed obsolete runtime from inject and development dependencies; added Cordis and consumed client package peers. DSH peers use ^0.1.2-rc.1 and development dependencies use exact 0.1.2-rc.1.
- Cordis peer stays exactly ^4.0.1 as requested. Development Cordis is 4.0.2 because the published rc.1 client packages require ^4.0.2; pnpm peers check is clean.
- Added renderer-owned slots Context augmentation; replaced ClientContext with Cordis Context in src/client/index.ts.
- Kept conversation SlotMap augmentation and the existing conversation.session.header.actions registration. Renderer is a declaration dependency, not an extra package-level inject edge.
- Removed obsolete runtime-store external exemption from scripts/dsh-client-preset.ts. No store value imports are used by this plugin.
- Added declaration-owner development dependencies discovered by the strict diagnostic: client-store, session, api-session-controller, brand, commands, llm, attachment, llm-retry, tool-todo, api-workspace-controller, client-ui-session, workspace, and jobs. These are not new runtime service requirements.
- Regenerated pnpm-lock.yaml, client.js, and client.js.map through scripts/build.mjs. index.mjs was rebuilt but remains byte-identical to Git.
- Added typecheck/test scripts and tests/migration.test.mjs (four static/built-artifact regressions).

## Seven-touchpoint ledger

| Touchpoint | Finding |
|---|---|
| Source patches | None. cordis.patch.yml is an unchanged composition insert, not a host source patch. |
| Persistent events | None. React effects and DOM observers are not session event consumers. |
| Services / Remote | slots registration and conversation activation; no Remote calls or runtime session imports. Context/slot declaration ownership migrated. |
| Host filesystem | No plugin runtime access. Build script only generates its own artifacts. |
| UI / commands / tools | Existing conversation header slot, React portal, floating question list. Registration contract checked against installed target declarations and built factory. |
| Custom channels / DOM / CSS | No HTTP/WS/auth routes. DOM data attributes and class-name fallbacks remain; actual browser navigation and rendering need live verification. |
| Subprocess / output | Existing local build subprocesses only; no plugin runtime subprocess API. |

Relevant net changes: alpha.1 removed aggregate runtime and split UI services; alpha.2 declaration dependency pruning requires explicit declaration owners. No applicable later breaking cards were found in this plugin's source.

## Verification

- Baseline build: PASS.
- pnpm install: PASS; lockfile regression confirms every resolved DSH package is 0.1.2-rc.1 and obsolete runtime is absent.
- pnpm run build: PASS (tsc plus host/client bundles).
- pnpm run typecheck: PASS using unchanged project compiler policy (skipLibCheck: true).
- pnpm test: PASS, 4/4. Tests cover cohort/inject peers, obsolete runtime absence including sourcemap/lockfile, built factory externals and slot contribution, and native host entry. The factory test intercepts registration; it is not a real Loader or browser test.
- pnpm peers check: PASS, no issues.
- git diff --check: PASS.
- Required inject-lint: exit 0, verdict OK; peersMissingForInject=[], peersMissingForImports=[], cordisPeer=^4.0.1, cordisOk=true, runtimeRefsLeft=[], rawWebServerRouteFiles=[], routeReviewRequired=false.

### Extra diagnostic limitations

The mandatory exploratory tsc --skipLibCheck false run exposed missing upstream declaration dependencies; those package owners were added. With --lib ES2024,DOM,DOM.Iterable,ESNext.Disposable and --incremental false, three upstream declaration errors remain (exit 2):

1. api-session-controller/lib/types/client/transport.d.ts:10: ClientRemote lacks session augmentation.
2. api-workspace-controller/lib/types/client/model.d.ts:5: TypertClientRemote lacks workspace augmentation.
3. client-ui-conversation/lib/types/client/contract/slots.d.ts:336: conversation is not in the assembled SlotMap.

Without the diagnostic ESNext.Disposable lib, Lexical also reports missing Disposable. No local ambient shims or host-package edits were added to conceal these diagnostics. This is not a claim that the entire upstream declaration graph passes strict library checking.

No exact-target real-host cold start, Loader composition mount, browser HMR/unload, actual scrolling/pagination/mobile behavior, or full user turn was run. The existing session runs an older host; it was not upgraded, restarted, or replaced. Static migration is verified; full runtime compatibility remains unverified.

## Recovery

Review the diff before commit. To undo, restore only the migration-owned manifest, lockfile, preset, client entry, generated client files, and remove the new migration tests/report, then reinstall using the restored lockfile. The initial client.js was already dirty and explicitly approved for rebuild; Git HEAD is not a backup of that original dirty artifact. No profile or host files were modified.
