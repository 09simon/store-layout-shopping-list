# Implementation Plan: Stock Android Design System UI Update

**Branch**: `002-stock-android-ui` | **Date**: 2026-08-31 | **Spec**: [`C/Git/Repos/season-ticket-tracker/specs/002-stock-android-ui/spec.md`](file:///C:/Git/Repos/season-ticket-tracker/specs/002-stock-android-ui/spec.md)

**Input**: Feature specification from `/specs/002-stock-android-ui/spec.md`

## Summary

Transform the shopping list and store layout application UI
into an authentic, cohesive Stock Android (Material Design 3 / Material You)
experience. The update incorporates Material 3 design tokens (color roles, tonal
elevations, rounded pills, typography), a Stock Android Bottom Navigation Bar
with active pill indicators, a clean Material 3 Top App Bar, Filled/Outlined text fields,
Floating Action Buttons (FAB), Modal Bottom Sheets with drag handles, tonal list cards,
and dynamic light/dark theme adaptation while preserving all underlying store sorting
and offline persistence logic.

## Technical Context

- **Language/Version**: TypeScript 5.x / HTML5 / CSS3 (Material 3 CSS Tokens)
- **Primary Dependencies**: Vite, Vanilla TypeScript / Web Components, IndexedDB
- **Storage**: IndexedDB (`idb`) + localStorage (Theme preferences)
- **Testing**: Vitest (Unit & Integration tests)
- **Target Platform**: Mobile-first Responsive Web Application / PWA
- **Project Type**: Web Application
- **Performance Goals**: 60 FPS animations, <16ms render frame budget, CLS < 0.05
- **Constraints**: Minimum 48x48dp touch targets, WCAG AA contrast compliance, 100% offline reliability
- **Scale/Scope**: All views (list, shopping mode, store selector, map viewer, top/bottom bindings)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Code Quality & Maintainability**: Modular TypeScript components, shared Material 3 design tokens, zero unresolved lint/build warnings.
- [x] **II. Rigorous Testing Standards**: Vitest suites preserved and expanded for UI component state validation.
- [x] **III. UX & Interface Consistency**: Strict adherence to stock Android (Material 3) patterns, 48xdp touch targets, smooth tactile feedback, contrast-compliant tonal surfaces.
- [x] **IV. Performance & Efficiency**: Zero layout thrashing, css-hardware-accelerated transitions, fast state rendering.

## Project Structure

### Documentation (this feature)

```text
specs/002-stock-android-ui/
├── plan.md              # This file
├── research.md          # Phase 0 research findings
├── data-model.md        # Phase 1 data model & token definitions
├── quickstart.md        # Phase 1 runnable validation guide
├── contracts/           # Phase 1 Material 3 contracts
│   └── ui-contracts.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code

```text
repo-root/
├── index.html             # Material 3 Android dock layout, top app bar, bottom nav, scrim
└── src/
    ├── app.ts             # Android application controller & navigation dispatcher
    ├── components/
    │   ├── LayoutViewer.ts  # Material 3 Store Inventory Map timeline stepper
    │   ├── ListEditor.ts    # M3 FAB action & outlined form inputs / bottom sheet
    │   ├── ListView.ts      # M3 tonal cards, 48dp checkboxes, filter chips
    │   ├── ShoppingMode.ts  # M3 linear progress bar, pick cards, completed chips
    │   └── StoreSelector.ts # M3 Modal Bottom Sheet / Dialog store picker
    └── styles/
        ├── tokens.css       # Material 3 (Material You) system color roles & typescales
        └── app.css          # Material 3 component styles, bottom nav, FAB positioning
```

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|------------|------------|-------------------------------------|
| *None* | N/A | N/A |
