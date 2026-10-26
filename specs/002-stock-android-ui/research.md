# Research: Stock Android Design System UI Update

**Feature**: Stock Android Design System UI Update
**Feature Branch**: `002-stock-android-ui`
**Date**: 2026-08-31

## Research Area 1: Material Design 3 (Material You) Token Architecture

### Decision
Adopt the complete Material Design 3 (M3 / Android 14+) design token taxonomy using CSS custom properties. Structure tokens into semantic roles:
- **Color Roles**: Primary, On-Primary, Primary-Container, On-Primary-Container, Secondary, Tertiary, Surface, Surface-Dim, Surface-Bright, Surface-Container-Lowest through Highest, Outline, Outline-Variant, Error.
- **Elevation & Surface Tinting**: Replace drop-shadow heavy skeuomorphism with M3 tonal surface elevation (levels 0 through 5) using subtle opacity layers and surface container tones.
- **Shape & Radii**: Extra Small (4px), Small (8px), Medium (12px), Large (16px), Extra Large (28px), and Full Pill (9999px).
- **Typography Scale**: Google Sans / Roboto hierarchy with Title Large/Medium/Small, Body Large/Medium, and Label Large/Medium.

### Rationale
Material Design 3 is the foundational design system of modern stock Android. Defining these semantic tokens in `tokens.css` satisfies Principle III (User Experience & Interface Consistency) of the Constitution and enables instantaneous light/dark theme adaptation without hardcoding component colors.

### Alternatives Considered
- *Material Design 2*: Rejected because it uses older rectangular boxes, heavy drop shadows, and lacks the expressive tonal palette and pill geometry of modern Android.
- *Generic iOS / Glassmorphic Theme*: Rejected because the explicit requirement is stock Android design.

---

## Research Area 2: Android Navigation Architecture & Viewport Ergonomics

### Decision
Implement a standard stock Android Bottom Navigation Bar for primary navigation with:
- Centered icon and text label.
- Pill-shaped active indicator capsule behind the active icon.
- Badges for live state (e.g. active shopping trip indicator).
- Accompanying standard Material 3 Top App Bar with title, subtitle, and top-right action slots (theme toggle, trip status).

### Rationale
Stock Android applications place primary destinations at the bottom of the screen within the thumb zone for effortless one-handed use, while the Top App Bar anchors context.

### Alternatives Considered
- *Top horizontal tabs*: Less thumb-accessible on mobile screens.
- *Side navigation drawer only*: Requires additional taps for frequent switching between shopping list and shopping mode.

---

## Research Area 3: Action Model & Modal Dialog / Bottom Sheet Patterns

### Decision
- **Primary Actions**: Extended Floating Action Button (FAB) or Standard FAB with Material 3 shape (`--radius-lg` or 16-28px rounded rectangle), elevation level 3, and icon + label.
- **Secondary Forms & Store Selection**: Material 3 Modal Bottom Sheet with top drag handle and rounded top corners (28px radius) for mobile viewports, adapting to centered M3 Dialog on wider viewports.
- **Category & Filter Chips**: M3 Assist and Filter chips with 8-12px pill shapes, clear selected states, and leading icons.

### Rationale
FAB and Bottom Sheets are signature stock Android components that streamline list manipulation and in-store configuration without navigating away from the active screen context.

### Alternatives Considered
- *Inline static accordion panels*: Cluttered UI and caused layout shifts.
- *Browser alert / prompt popups*: Poor UX and broken Android look-and-feel.

---

## Research Area 4: Form Controls, Touch Targets & State Feedback

### Decision
- **Text Inputs**: Material 3 Outlined and Filled text field variants with floating labels, helper text, and focused primary borders.
- **Checkboxes & Buttons**: Minimum 48x48dp equivalent touch targets with CSS ripple animations and tactile feedback on click/press.
- *(Shopping Mode Checkoff**: Large M3 checkbox with smooth check animation, strikethrough transition, and automatic grouping into a collapsed/expandable completed section.

### Rationale
Supermarket shopping requires rapid one-handed tapping on moving items. Meeting 48dp minimum touch target guidelines prevents mis-taps and satisfies WCAG AA accessibility standards.

### Alternatives Considered
- *Standard browser checkboxes (16px)*: Too small for mobile supermarket navigation.

---

## Research Area 5: Dynamic Theming (Light & Dark Mode)

### Decision
Implement dual-palette Material You color definitions with automatic detection (`@media (prefers-color-scheme: dark)`) and a manual toggle stored in `localStorage` (`data-theme="light"` / `data-theme="dark"` on `<html>`).

### Rationale
Stock Android supports both high-contrast light mode for bright sunny grocery stores and low-glare dark mode for evening shopping.

### Alternatives Considered
- *Dark mode only*: Inflexible for users in bright outdoor or supermarket lighting.
