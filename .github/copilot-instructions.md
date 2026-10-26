# Repository guidance

## Commands

- `npm run dev` starts the Vite development server at `http://localhost:5173`.
- `npm run build` runs the strict TypeScript check and creates the production build.
- `npm test` runs the full Vitest suite.
- Run one test file with `npm test -- tests/unit/routeSorter.test.ts`; narrow to a test name with `npm test -- tests/unit/routeSorter.test.ts -t "physical store progression"`.
- There is no lint script in `package.json`.

## Architecture

This is a browser-based TypeScript application built with Vite and plain DOM APIs. `index.html` provides the root elements and loads `src/app.ts`. `AppController` initializes persisted data, wires component callbacks to repository operations, manages the active list/store/tab/theme, and refreshes the rendered view.

UI components in `src/components/` render into the DOM roots and report user actions through callbacks; they do not own persistence. Shared domain interfaces live in `src/models/types.ts`. Repository services in `src/repository/` provide list, store directory, trip logging, and community-layout operations over `db.ts`, which serializes records to `localStorage` and uses an in-memory fallback when browser storage is unavailable.

The store-routing data flow crosses several modules: `defaultLayouts.ts` defines categories and infers a category from each item title; `sequenceLogger.ts` records the categories picked during a trip; `communitySync.ts` passes store logs to `wpfConsensus.ts` and persists the computed layout graph; `routeSorter.ts` uses that graph (or the store/default preset sequence) to order list items. `src/styles/tokens.css` defines the Material 3 design tokens and theme values used by `app.css` and the components.

## Repository-specific conventions

- Category keys are shared identifiers across item data, category inference, UI labels, and route sequences. When adding or changing one, keep `DEFAULT_CATEGORIES`, `CATEGORY_KEYWORDS`, and any store-specific ordering (including the Tesco Szentpéteri preset in `routeSorter.ts`) consistent.
- Keep persistence and domain operations in repository services; components communicate changes through constructor callbacks, and `AppController` coordinates those operations and refreshes.
- Keep store route and community consensus logic in `src/engine/`. Route sorting falls back to the default category sequence when there is no learned graph or store-specific sequence.
- Theme styling is driven by CSS custom properties and the root `data-theme` attribute. Prefer existing `--md-sys-*` tokens and component class patterns over introducing isolated colors or styles.
- Tests use Vitest with the Node environment and globals enabled. Unit tests live in `tests/unit/`; the end-to-end service flow is exercised in `tests/integration/`. The database adapter is a module singleton, so tests that mutate persisted records should clean up their state.
