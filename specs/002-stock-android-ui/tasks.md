---
description: "Task list for Stock Android Design System UI Update implementation"
---

# Tasks: Stock Android Design System UI Update

**Input**: Design documents from `/specs/002-stock-android-ui/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/ui-contracts.md, quickstart.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize Material 3 viewport, fonts, and design tokens

- [X] T001 Configure Material 3 typography and base viewport metadata in index.html
- [X] T002 [P] Setup Material 3 CSS design tokens and color roles in src/styles/tokens.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout dock and theme state management

**⚠️ CRITICAL**: Must complete before user story implementation

- [X] T003 Implement core Material 3 layout structure, dock container, and bar frames in src/styles/app.css
- [X] T004 [P] Implement theme controller with system preference detection and localStorage persistence in src/app.ts

**Checkpoint**: Foundation ready - User Story implementation can begin

---

## Phase 3: User Story 1 - Stock Android Navigation & Layout Experience (Priority: P1) 🎯 MVP

**Goal**: Provide authentic Stock Android Bottom Navigation Bar with active pill indicators and Top App Bar
**Independent Test**: Verify Top App Bar and Bottom Navigation Bar render with pill indicators and switch views smoothly

- [X] T005 [P] [US1] Create Stock Android Bottom Navigation Bar component with active pill indicators in src/components/BottomNavBar.ts
- [X] T006 [P] [US1] Create Material 3 Top App Bar component with title and context actions in src/components/TopAppBar.ts
- [X] T007 [US1] Update index.html and src/app.ts to wire Top App Bar and Bottom Navigation Bar view switching
- [X] T008 [US1] Style Bottom Navigation Bar and Top App Bar with M3 surface elevation in src/styles/app.css

**Checkpoint**: User Story 1 fully functional and testable independently

---

## Phase 4: User Story 2 - Material 3 Shopping List Management & Interaction Elements (Priority: P1)

**Goal**: Manage shopping lists using Material 3 FAB, Modal Bottom Sheets, tonal cards, 48dp checkboxes, and chips
**Independent Test**: Add items, edit categories, and toggle items using M3 styled cards, chips, and FAB

- [X] T009 [P] [US2] Update src/components/ListEditor.ts to use Material 3 Floating Action Button (FAB) and Modal Bottom Sheet form
- [X] T010 [P] [US2] Update src/components/ListView.ts to render Material 3 tonal cards, 48dp tactile checkboxes, and filter chips
- [X] T011 [P] [US2] Update src/components/StoreSelector.ts to use Material 3 Modal Bottom Sheet / Dialog pattern with search box
- [X] T012 [US2] Style M3 cards, FAB, chips, inputs, and bottom sheet containers in src/styles/app.css

**Checkpoint**: User Stories 1 and 2 working independently

---

## Phase 5: User Story 3 - Native Android Shopping Mode Experience (Priority: P2)

**Goal**: Ergonomic in-store shopping mode with M3 linear progress bar, shelf-route guidance cards, and completion sheet
**Independent Test**: Enter shopping mode, mark items complete, and observe linear progress and route cards

- [X] T013 [P] [US3] Update src/components/ShoppingMode.ts with M3 linear progress bar, pick cards, and completion bottom sheet
- [X] T014 [P] [US3] Update src/components/LayoutViewer.ts with M3 timeline stepper and department cards
- [X] T015 [US3] Style shopping mode live indicators, linear progress track, and layout timeline in src/styles/app.css

**Checkpoint**: User Stories 1, 2, and 3 fully functional

---

## Phase 6: User Story 4 - Dynamic Android Theming & Surface Tones (Priority: P3)

**Goal**: Dynamic Material You light and dark theme adaptation with accessible contrast
**Independent Test**: Toggle theme in Top App Bar, verify surfaces and tonal elevations adapt cleanly

- [X] T016 [P] [US4] Define light and dark mode Material You palette tokens in src/styles/tokens.css
- [X] T017 [US4] Wire theme toggle button in Top App Bar to cycle light/dark/system modes in src/app.ts

**Checkpoint**: All user stories independently functional and themed successfully

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility verification, touch target audits, testing, and build validation

- [X] T018 [P] Add unit/integration tests for theme switching and navigation state in tests/unit/themeAndNav.test.ts
- [X] T019 Validate all touch targets meet 48x48dp minimum and verify WCAG AA contrast in src/styles/app.css
- [X] T020 Run quickstart validation, execute full test suite, and verify production build in vite.config.ts

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-6)**: Depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all user stories being complete

### User Story Dependencies
- **US2 (P1)**: Can proceed independently after Foundational structure
- **US3 (P2)**: Can proceed independently after Foundational structure
- **US4 (P3)**: Can proceed independently after Foundational structure

---

## Parallel Execution Examples

```bash
# Parallel foundation tasks:
run T001 in index.html & run T002 in src/styles/tokens.css

# Parallel component development for US2:
run T009 in src/components/ListEditor.ts & run T010 in src/components/ListView.ts & run T011 in src/components/StoreSelector.ts
```

---

## Implementation Strategy (MVP First)

1. Complete Phase 1 (Setup) & Phase 2 (Foundational)
2. Complete Phase 3 (US1 - Stock Android Navigation & Top App Bar dock) <-- **MVP Ready**
3. Complete Phase 4 (US2 - Material 3 List Editor, Cards, FAB)
4. Complete Phase 5 (US3 - Material 3 Shopping Mode)
5. Complete Phase 6 (US4 - Dynamic Theming & Tonal Palettes)
6. Complete Phase 7 (Polish & Validation)
