# Implementation Plan: Community-Driven Store Layout Shopping List with Stock Android UI

**Branch**: `001-store-layout-shopping-list` | **Date**: 2026-10-26 | **Spec**: [`specs/001-store-layout-shopping-list/spec.md`](file:///C:/Git/Repos/store-layout-shopping-list/specs/001-store-layout-shopping-list/spec.md)

**Input**: Feature specification from `/specs/001-store-layout-shopping-list/spec.md`

## Summary

Build an offline-first Progressive Web Application (PWA) for managing grocery lists that automatically reorders items matching the physical shelf sequence and walking route of a selected supermarket (e.g. Tesco Szentpéteri kapu, Miskolc). During shopping trips in "Shopping Mode", the app records timestamped picking sequences and aggregates them via Weighted Pairwise Frequency (WPF) topological graph sorting to learn and refine crowdsourced store layout maps. The entire user interface is built on modern Stock Android design principles (Material Design 3 / Material You), featuring a Top App Bar, Bottom Navigation Bar with expressive active pill indicators, Floating Action Buttons (FAB), tonal cards, 48dp touch targets, and automatic Light/Dark theme adaptation.

## Technical Context

- **Language/Version**: TypeScript 5.x / JavaScript ES2022 / HTML5 / CSS3
- **Primary Dependencies**: Vite, Vanilla TypeScript / Web Components, CSS Material 3 Tokens
- **Storage**: Local Storage / IndexedDB (Offline repository pattern with in-memory fallback)
- **Testing**: Vitest (Unit & Integration test suites)
- **Target Platform**: Mobile-first Responsive Web Application / PWA
- **Project Type**: Web Application
- **Performance Goals**: <500ms list reordering upon store selection, 60 FPS UI transitions (<16ms frame budget), CLS < 0.05
- **Constraints**: 100% offline operational reliability inside supermarkets, minimum 48x48dp equivalent touch targets, WCAG AA contrast compliance across all themes
- **Scale/Scope**: Multi-store location directory, crowdsourced sequence logs, complete Stock Android navigation shell and components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Code Quality & Maintainability**: Strict TypeScript type safety across models, engine, repository, and components; clean separation of concerns; zero unresolved build or lint errors.
- [x] **II. Rigorous Testing Standards**: Comprehensive Vitest suite covering the Weighted Pairwise Frequency algorithm, store route sorting, sequence logging, repository persistence, and Stock Android UI navigation/theme states.
- [x] **III. User Experience & Interface Consistency**: Authentic Stock Android (Material Design 3) design tokens (`tokens.css`), 48dp minimum touch targets, responsive bottom navigation with active pill indicators, and high-contrast light/dark themes.
- [x] **IV. Performance & Efficiency Requirements**: Asynchronous storage operations, lightweight DAG topological sorting, zero layout thrashing, fast initial load, and offline-first resiliency.

## Project Structure

### Documentation (this feature)

```text
specs/001-store-layout-shopping-list/
├── plan.md              # Implementation plan (this file)
├── research.md          # Phase 0 research findings (WPF algorithm, offline persistence, Material 3 architecture)
├── data-model.md        # Phase 1 data model & token definitions
├── quickstart.md        # Phase 1 runnable validation guide
├── checklists/
│   └── requirements.md  # Specification quality checklist
└── contracts/
    ├── api-contracts.md # Backend & offline repository interfaces
    └── ui-contracts.md  # Material 3 UI token, component geometry, and element contracts
```

### Source Code

```text
src/
├── components/          # Stock Android UI Components
│   ├── BottomNavBarComponent.ts # M3 Bottom Navigation Bar with active pill indicators
│   ├── ItemListComponent.ts     # Tonal list cards, category chips, and FAB
│   ├── ShoppingModeComponent.ts # Sequential shopping checklist & progress bar
│   └── StoreSelectorComponent.ts# Store directory picker & modal sheet
├── engine/              # Algorithmic domain engine
│   ├── defaultLayouts.ts        # Default category templates & keyword inference
│   ├── routeSorter.ts           # Route sequence sorting engine
│   └── wpfConsensus.ts          # Weighted Pairwise Frequency topological sort
├── models/              # Shared domain schemas & TypeScript interfaces
│   └── types.ts
├── repository/          # Offline persistence & data access layer
│   ├── db.ts                    # LocalStorage / IndexedDB storage adapter
│   ├── shoppingListRepo.ts      # List CRUD operations
│   ├── storeRepo.ts             # Store location directory
│   ├── tripLogRepo.ts           # Recorded sequence logs
│   └── communitySync.ts         # Community consensus aggregation service
├── styles/              # Design system styling
│   ├── tokens.css               # Material 3 color roles, shapes, elevations, and typography
│   └── app.css                  # Component layout & responsive view rules
└── app.ts               # Application entrypoint & AppController state coordinator

tests/
├── unit/                # Unit test suites
│   ├── routeSorter.test.ts      # Store layout progression tests
│   ├── sequenceLogger.test.ts   # In-store pick sequence recording tests
│   ├── shoppingList.test.ts     # List CRUD and persistence tests
│   ├── themeAndNav.test.ts      # Stock Android navigation & theme tests
│   └── wpfConsensus.test.ts     # WPF consensus topological algorithm tests
└── integration/         # Integration test suites
    └── quickstartValidation.test.ts # End-to-end user shopping trip simulation
```

**Structure Decision**: Single modular web application separating algorithmic domain engine (`src/engine`), persistence services (`src/repository`), UI components (`src/components`), and Material 3 design tokens (`src/styles/tokens.css`).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | N/A | N/A |
