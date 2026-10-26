# Quickstart Validation Guide: Stock Android UI Update

**Feature**: Stock Android Design System UI Update
**Feature Branch**: `002-stock-android-ui`
**Date**: 2026-08-31

## Prerequisites
1. Node.js 18+ / NPM installed.
2. Development server open at [http://localhost:5173/](http://localhost:5173/)

## Validation Scenarios

### Scenario 1: Material 3 Bottom Navigation & Top App Bar
- **Action**: Open app on a mobile or desktop viewport.
- **Expected Outcome**:
  - A clean Material 3 Top App Bar is present with app title, store status, and theme toggle icon.
  - A Stock Android Bottom Navigation Bar is docked at the bottom with pill-indicator swaps when tapping "My Shopping List", "Live Shopping Mode", or "Store Inventory Map".

---

### Scenario 2: Floating Action Button (FAB) & Modal Bottom Sheet
- **Action**: Tap the Extended FAB ("+ Add Item") or "Change Store" button.
- **Expected Outcome**:
  - A Material 3 Modal Bottom Sheet slides up with a rounded drag handle, providing outlined/tonal input fields with floating labels and >48dp touch targets.

---

### Scenario 3: Shopping List Cards & Tactile Checkboxes
- **Action**: View shopping list items and tap a checkbox or category filter chip.
- **Expected Outcome**:
  - Items are organized in Material 3 tonal cards with 16px rounded corners.
  - Checkboxes provide a Material 3 squared-rounded check animation and tactile ripple feedback.

---

## Validation Commands

Check that typecheck, build, and all unit/integration tests pass without warnings:

g``bash
npm run test
npm run build
n`m run dev
```
