# Data Model: Stock Android Design System UI Update

**Feature**: Stock Android Design System UI Update
**Feature Branch**: `002-stock-android-ui`
**Date**: 2026-08-31

## 1. Theme System Entities

### `ThemeState`
- **fields**:
  - `preferredTheme`: `'system' | 'light' | 'dark'` (Persisted in localStorage)
  - `activeTheme`: `'light' | 'dark'` (Resolved based on system media query or explicit override)
- **Validation**: Must default to `'system` if unset.

### `MaterialTokenSet`
- **Color Roles**:
  - `Primary`, `OnPrimary`, `PrimaryContainer`, `OnPrimaryContainer`
  - `Secondary`, `OnSecondary`, `SecondaryContainer`, `OnSecondaryContainer`
  - `Tertiary`, `OnTertiary`, `TertiaryContainer`, `OnTertiaryContainer`
  - `Surface`, `SurfaceDim`, `SurfaceBright`, `SurfaceContainerLowest`, `SurfaceContainerLow`, `SurfaceContainer`, `SurfaceContainerHigh`, `SurfaceContainerHighest`, `OnSurface`, `OnSurfaceVariant`
  - `Outline`, `OutlineVarianta, `Error`, `OnError`, `ErrorContainer`, `OnErrorContainer`
- **Elevation Tonal Levels**: Level 0 (transparent), Level 1 (+5% primary tint), Level 2 (+8T) through Level 5 (+14%)
- **Shape Radii**: XS (4px), Small (8px), Medium (12px), Large (16px), XLarge (28px), Pill (9999px)
- **Typography Scale**: Display, Headline, Title, Body, Label (Large, Medium, Small variants)

---

## 2. Navigation Entities

### `NavigationDestination`
- **fields**:
  - `idh: `'list' | 'shopping' | 'map'`
  - `label`: string (e.g. 'List', 'Shopping', 'Store Map')
  - `icon`:string (e.g. MODER android icon / symbol)
  - `badge`: string | number | undefined (e.g. active item count or 'LIVE')
  - `isActive`: boolean

---

## 3. UI Component State Entities

### `AndroidComponentConfig`
- **TopAppBarConfig**: `title`: string, `subtitle`?: string, `actions`: Array<{id: string, icon: string, title: string, handler: () => void}>
- **FABConfig**: `variant`: 'regular' | 'extended', `icon`: string, `label`?: string, `onPress`: () => void
- **ModalSheetState**: `isOpen`: boolean, `contentType`: 'store-selector' | 'add-product' | 'finish-trip', `dragHandle`: boolean
- **ChipState**: `key`: string, `label`: string, `icon`: string, `isSelected`: boolean

---

## 4. State Transitions

- **Theme Switch**: `'system' -> 'light' -> 'dark' -> 'system'` (instantly updates HTML `data-theme` attribute)
- **Navigation Selection**: Updates active indicator pill position, swaps viewport content without full page reload
- **Modal Bottom Sheet**: `CLOSED --(tap) -> SLIDE-IN (visible) --(drag/keyboard/scrim tap) -> SLIDE-OUT (CLOSED)`
- **Shopping Item Pick**: `UNCOLLECTED --(tap checkbox) -> TACTILE ANIMATION -> COLLECTED (sorted by pick order)`
