---

description: "Task list for Community-Driven Store Layout Shopping List with Stock Android UI"
---

# Tasks: Community-Driven Store Layout Shopping List with Stock Android UI

**Input**: Design documents from `/specs/001-store-layout-shopping-list/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5, US6)
- Exact file paths included in all descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project directory structure for components, engine, models, repository, and styles in src/ and tests/
- [ ] T002 Initialize npm package dependencies with Vite, TypeScript, and Vitest in package.json and vite.config.ts
- [ ] T003 [P] Configure TypeScript compiler options in tsconfig.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 [P] Define core domain interfaces (ShoppingList, ListItem, Store, SequenceLog, StoreLayoutGraph, ThemeAndNavigation) in src/models/types.ts
- [ ] T005 [P] Setup Material Design 3 CSS custom properties and design token roles in src/styles/tokens.css
- [ ] T006 [P] Implement offline storage adapter with LocalStorage serialization and in-memory fallback in src/repository/db.ts
- [ ] T007 [P] Create default supermarket fallback section layout map and department inference in src/engine/defaultLayouts.ts
- [ ] T008 Implement local storage repository service for list and store persistence in src/repository/storeRepository.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and Manage Shopping Lists with Stock Android UI (Priority: P1) 🎯 MVP

**Goal**: Allow shoppers to create, edit, and organize grocery lists using Stock Android Material 3 components (FAB, tonal cards, filter chips, outlined inputs with floating labels, 48dp touch targets).

**Independent Test**: Launch app, tap FAB to add items (e.g. Nectarines, Rice Drink, Flour, Rat Poison), filter by chip, verify tonal cards display with 48dp touch targets, and verify persistence.

### Tests for User Story 1

- [ ] T009 [P] [US1] Write unit tests for shopping list CRUD operations in tests/unit/shoppingList.test.ts

### Implementation for User Story 1

- [ ] T010 [P] [US1] Implement Material 3 ListEditor component with FAB, floating label input, and category chips in src/components/ListEditor.ts
- [ ] T011 [P] [US1] Implement Material 3 ListView component with tonal cards and 48dp touch targets in src/components/ListView.ts
- [ ] T012 [US1] Connect ListEditor and ListView components to repository operations and state coordinator in src/app.ts

**Checkpoint**: User Story 1 is fully functional and testable independently (MVP ready).

---

## Phase 4: User Story 2 - Store Selection and Physical Route-Based Item Sorting (Priority: P1)

**Goal**: Allow shoppers to select a target store (such as Tesco Szentpéteri kapu, Miskolc) from a modal sheet/dialog and sort list items matching the store's physical shelf walking path.

**Independent Test**: Select Tesco Szentpéteri kapu, Miskolc, load items across produce, plant milk, bakery, cold cuts, flour endcap, household, hygiene, and verify items sort sequentially.

### Tests for User Story 2

- [ ] T013 [P] [US2] Write unit tests for physical store route sorting engine in tests/unit/routeSorter.test.ts

### Implementation for User Story 2

- [ ] T014 [P] [US2] Implement store location directory seed data and search lookup in src/repository/storeDirectory.ts
- [ ] T015 [P] [US2] Implement StoreSelector component using Stock Android modal bottom sheet in src/components/StoreSelector.ts
- [ ] T016 [US2] Implement physical route sorting engine mapping list items to store layout progression in src/engine/routeSorter.ts
- [ ] T017 [US2] Integrate StoreSelector and route sorting events with active shopping list view in src/app.ts

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Interactive Shopping Mode & Sequence Recording (Priority: P1)

**Goal**: Provide an interactive Shopping Mode with Material 3 checklist elements, linear progress indicators, tactile state feedback, and timestamped pick sequence recording for layout learning.

**Independent Test**: Enter Shopping Mode at Tesco Szentpéteri kapu, tap items in sequence, verify linear progress updates, finish trip, and verify sequence log is saved locally.

### Tests for User Story 3

- [ ] T018 [P] [US3] Write unit tests for shopping trip sequence logger in tests/unit/sequenceLogger.test.ts

### Implementation for User Story 3

- [ ] T019 [P] [US3] Implement SequenceLogger service to record timestamped item pick transitions in src/repository/sequenceLogger.ts
- [ ] T020 [P] [US3] Implement ShoppingMode component with M3 linear progress bar, checklist checkboxes, and route cards in src/components/ShoppingMode.ts
- [ ] T021 [US3] Integrate ShoppingMode lifecycle, sequence logging, and completion flow into src/app.ts

**Checkpoint**: User Stories 1, 2, and 3 work independently.

---

## Phase 6: User Story 4 - Stock Android Navigation & Layout Shell (Priority: P1)

**Goal**: Provide native Stock Android navigation via a Material 3 Top App Bar and Bottom Navigation Bar with expressive active pill indicators and status badges across views.

**Independent Test**: Launch app across viewports, verify Top App Bar and Bottom Navigation Bar with active pill indicators, and switch between List, Stores, Layout, and Shopping Mode smoothly.

### Tests for User Story 4

- [ ] T022 [P] [US4] Write unit tests for Top App Bar and Bottom Navigation Bar with active pill indicator in tests/unit/themeAndNav.test.ts

### Implementation for User Story 4

- [ ] T023 [P] [US4] Implement Material 3 TopAppBar component with title typography and action slots in src/components/TopAppBar.ts
- [ ] T024 [P] [US4] Implement Stock Android BottomNavBar component with pill indicators and badges in src/components/BottomNavBar.ts
- [ ] T025 [US4] Wire BottomNavBar tab navigation and TopAppBar state bindings to main view container in src/app.ts

**Checkpoint**: User Stories 1, 2, 3, and 4 work independently.

---

## Phase 7: User Story 5 - Community Store Layout Aggregation & Learning (Priority: P2)

**Goal**: Aggregate crowdsourced shopping sequence logs using Weighted Pairwise Frequency (WPF) topological graph sorting to build and continuously update store layout maps.

**Independent Test**: Provide multiple sequence logs, execute WPF consensus calculation, and verify derived layout graph orders categories in physical sequence.

### Tests for User Story 5

- [ ] T026 [P] [US5] Write unit tests for Weighted Pairwise Frequency topological consensus engine in tests/unit/wpfConsensus.test.ts

### Implementation for User Story 5

- [ ] T027 [US5] Implement Weighted Pairwise Frequency (WPF) graph consensus builder in src/engine/wpfConsensus.ts
- [ ] T028 [US5] Implement community synchronization service and background log aggregator in src/repository/communitySync.ts
- [ ] T029 [US5] Implement LayoutViewer component to visualize physical store section progression in src/components/LayoutViewer.ts
- [ ] T030 [US5] Wire layout visualization and community sync updates into src/app.ts

**Checkpoint**: User Stories 1 through 5 are independently functional.

---

## Phase 8: User Story 6 - Dynamic Android Theming & Surface Tones (Priority: P3)

**Goal**: Dynamic Material 3 tonal surface palettes with automatic light and dark theme adaptation and accessible WCAG AA contrast ratios.

**Independent Test**: Toggle theme between light and dark, verify all surfaces, cards, text, and elevations adapt instantly adhering to Material You color roles.

### Tests for User Story 6

- [ ] T031 [P] [US6] Add unit tests for Light/Dark theme switching and token application in tests/unit/themeAndNav.test.ts

### Implementation for User Story 6

- [ ] T032 [P] [US6] Implement dynamic Light and Dark mode CSS surface rules and tonal containers in src/styles/app.css
- [ ] T033 [US6] Implement theme toggle controller and localStorage preference persistence in src/app.ts

**Checkpoint**: All 6 user stories are fully functional and integrated.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Offline PWA integration, accessibility validation, and end-to-end verification

- [ ] T034 [P] Implement PWA offline Service Worker asset caching in src/sw.js and register in src/app.ts
- [ ] T035 [P] Implement end-to-end user shopping trip integration test in tests/integration/quickstartValidation.test.ts
- [ ] T036 Validate accessibility touch targets (48x48px minimum) and WCAG AA contrast across light/dark themes in src/styles/app.css
- [ ] T037 Execute full test suite (npm test) and validate quickstart scenarios in specs/001-store-layout-shopping-list/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion.
  - US1 (P1 - MVP) $\rightarrow$ US2 (P1) $\rightarrow$ US3 (P1) $\rightarrow$ US4 (P1) $\rightarrow$ US5 (P2) $\rightarrow$ US6 (P3).
- **Polish (Phase 9)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories.
- **User Story 2 (P1)**: Depends on US1 list entities, but route sorting engine can be tested independently.
- **User Story 3 (P1)**: Integrates with US1 and US2, but shopping mode simulation can be tested independently.
- **User Story 4 (P1)**: Can be implemented and tested independently using mocked views.
- **User Story 5 (P2)**: Depends on sequence log structures from US3, algorithm can be tested independently with mock logs.
- **User Story 6 (P3)**: Depends on design tokens (Phase 2), can be applied and verified across all views.

### Parallel Opportunities

- **Setup**: `T003` can run in parallel with `T001`/`T002`.
- **Foundational**: `T004`, `T005`, `T006`, `T007` can all run in parallel.
- **User Story 1**: `T009`, `T010`, and `T011` can run in parallel.
- **User Story 2**: `T013`, `T014`, and `T015` can run in parallel.
- **User Story 3**: `T018`, `T019`, and `T020` can run in parallel.
- **User Story 4**: `T022`, `T023`, and `T024` can run in parallel.
- **User Story 5**: `T026` and `T027` can run in parallel.
- **User Story 6**: `T031` and `T032` can run in parallel.
- **Polish**: `T034` and `T035` can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch test and UI components for User Story 1 in parallel:
Task: "Write unit tests for shopping list CRUD operations in tests/unit/shoppingList.test.ts"
Task: "Implement Material 3 ListEditor component with FAB, floating label input, and category chips in src/components/ListEditor.ts"
Task: "Implement Material 3 ListView component with tonal cards and 48dp touch targets in src/components/ListView.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify list creation, editing, and local persistence.
5. Deploy/demo MVP release.

### Incremental Delivery

1. Setup + Foundational $\rightarrow$ Foundation Ready.
2. Add User Story 1 $\rightarrow$ Test independently $\rightarrow$ MVP Release!
3. Add User Story 2 $\rightarrow$ Store physical route sorting enabled.
4. Add User Story 3 $\rightarrow$ Interactive Shopping Mode & sequence logging enabled.
5. Add User Story 4 $\rightarrow$ Stock Android Top App Bar & Bottom Navigation Bar shell active.
6. Add User Story 5 $\rightarrow$ Community WPF graph learning & layout map refinement active.
7. Add User Story 6 $\rightarrow$ Dynamic Light/Dark Android theming enabled.
8. Complete Phase 9: Polish & full validation.
