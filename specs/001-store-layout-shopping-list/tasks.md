# Tasks: Community-Driven Store Layout Shopping List

**Input**: Design documents from `/specs/001-store-layout-shopping-list/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Exact file paths included in all descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project directory structure (`src/components/`, `src/engine/`, `src/models/`, `src/repository/`, `src/styles/`, `tests/unit/`, `tests/integration/`)
- [X] T002 Initialize npm project with Vite, TypeScript, and Vitest in `package.json` and `vite.config.ts`
- [X] T003 [P] Configure CSS design tokens, color theme variables, and global typography in `src/styles/tokens.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Define core domain interfaces (`ShoppingList`, `ListItem`, `Store`, `SequenceLog`, `StoreLayoutGraph`) in `src/models/types.ts`
- [X] T005 [P] Implement IndexedDB storage schema and database wrapper in `src/repository/db.ts`
- [X] T006 Implement local storage repository manager for lists and store records in `src/repository/storeRepository.ts`
- [X] T007 [P] Create default supermarket fallback section layout map in `src/engine/defaultLayouts.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Manage Shopping Lists (Priority: P1) 🎯 MVP

**Goal**: Allow users to create, edit, organize, and persist shopping lists with items categorized or uncategorized.

**Independent Test**: Create list titled "Tesco Shopping", add items (Nectarines, Rice Drink, Fine Flour, Rat Poison), check off items, reload application, and verify list state persists.

### Tests for User Story 1

- [X] T008 [P] [US1] Write unit test for shopping list CRUD operations in `tests/unit/shoppingList.test.ts`

### Implementation for User Story 1

- [X] T009 [P] [US1] Implement List Editor component for adding, editing, and deleting items in `src/components/ListEditor.ts`
- [X] T010 [P] [US1] Implement Shopping List View component displaying item items in `src/components/ListView.ts`
- [X] T011 [US1] Connect List Editor and ListView components to `storeRepository.ts` and initialize app state in `src/app.ts`

**Checkpoint**: At this point, User Story 1 is fully functional and testable independently (MVP ready).

---

## Phase 4: User Story 2 - Store Selection and Physical Route-Based Item Sorting (Priority: P1)

**Goal**: Allow users to select a store location (e.g. Tesco Szentpéteri kapu, Miskolc) and reorder shopping list items to match the physical walking route.

**Independent Test**: Select store location "Tesco Szentpéteri kapu, Miskolc", load a multi-department list, and verify items reorder sequentially: Produce $\rightarrow$ Bakery $\rightarrow$ Cold Cuts $\rightarrow$ Flour $\rightarrow$ Household Paper $\rightarrow$ Hygiene.

### Tests for User Story 2

- [X] T012 [P] [US2] Write unit test for physical route sorting engine in `tests/unit/routeSorter.test.ts`

### Implementation for User Story 2

- [X] T013 [P] [US2] Implement store directory seed data and search lookup service (including Tesco Szentpéteri kapu, Miskolc) in `src/repository/storeDirectory.ts`
- [X] T014 [P] [US2] Implement Store Selector UI dropdown component in `src/components/StoreSelector.ts`
- [X] T015 [US2] Implement physical route sorting engine mapping list items to store layout indices in `src/engine/routeSorter.ts`
- [X] T016 [US2] Integrate Store Selector UI and physical route sorter into `src/app.ts`

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Interactive Shopping & Sequence Recording (Priority: P1)

**Goal**: Interactive "Shopping Mode" where shoppers mark items collected in real time as they walk store aisles, recording timestamped sequence logs.

**Independent Test**: Start Shopping Mode at Tesco Szentpéteri kapu, tap items as collected in shelf sequence, tap Finish Shopping, and verify timestamped sequence log is saved locally.

### Tests for User Story 3

- [X] T017 [P] [US3] Write unit test for shopping trip sequence logger in `tests/unit/sequenceLogger.test.ts`

### Implementation for User Story 3

- [X] T018 [P] [US3] Implement Interactive Shopping Mode UI component with touch-friendly item picking in `src/components/ShoppingMode.ts`
- [X] T019 [US3] Implement Sequence Logger service to record item collection timestamps in `src/repository/sequenceLogger.ts`
- [X] T020 [US3] Integrate Shopping Mode workflow and trip completion into `src/app.ts`

**Checkpoint**: User Stories 1, 2, and 3 work independently.

---

## Phase 6: User Story 4 - Community Store Layout Aggregation & Learning (Priority: P2)

**Goal**: Aggregate crowdsourced shopping sequence logs using Weighted Pairwise Frequency (WPF) topological graph sorting to build and refine store layout maps.

**Independent Test**: Provide multiple sequence logs for a store, run consensus builder, and verify updated layout graph correctly places items and aisles in physical sequence.

### Tests for User Story 4

- [X] T021 [P] [US4] Write unit test for Weighted Pairwise Frequency topological consensus engine in `tests/unit/wpfConsensus.test.ts`

### Implementation for User Story 4

- [X] T022 [US4] Implement Weighted Pairwise Frequency (WPF) graph consensus builder in `src/engine/wpfConsensus.ts`
- [X] T023 [US4] Implement community sync manager and log aggregation background processor in `src/repository/communitySync.ts`
- [X] T024 [US4] Integrate community layout graph updates into `src/app.ts` and create Layout Visualization component in `src/components/LayoutViewer.ts`

**Checkpoint**: All user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Offline PWA integration, visual design polish, and validation

- [X] T025 [P] Implement PWA Service Worker for offline asset caching in `src/sw.js` and register in `src/app.ts`
- [X] T026 [P] Write integration test validating quickstart scenarios in `tests/integration/quickstartValidation.test.ts`
- [X] T027 Add visual polish, CSS micro-animations, glassmorphic card styling, and touch feedback in `src/styles/app.css`
- [X] T028 Execute full test suite (`npm test`) and validate quickstart scenarios in `specs/001-store-layout-shopping-list/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - US1 (P1 - MVP) $\rightarrow$ US2 (P1) $\rightarrow$ US3 (P1) $\rightarrow$ US4 (P2).
- **Polish (Phase 7)**: Depends on completion of user stories.

### Parallel Opportunities

- **Setup Tasks**: `T003` can run in parallel with `T001`/`T002`.
- **Foundational Tasks**: `T004`, `T005`, and `T007` can run in parallel.
- **User Story 1**: `T008`, `T009`, and `T010` can run in parallel.
- **User Story 2**: `T012`, `T013`, and `T014` can run in parallel.
- **User Story 3**: `T017` and `T018` can run in parallel.
- **User Story 4**: `T021` can run in parallel with engine design.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP & VALIDATE**: Verify list creation, editing, and local persistence.

### Incremental Delivery

1. Setup + Foundational $\rightarrow$ Foundation Ready.
2. Add User Story 1 $\rightarrow$ Test $\rightarrow$ MVP Release!
3. Add User Story 2 $\rightarrow$ Store physical route sorting enabled.
4. Add User Story 3 $\rightarrow$ Interactive Shopping Mode & sequence logging enabled.
5. Add User Story 4 $\rightarrow$ Community WPF graph learning & layout map refinement active.
