# Material Design 3 UI Contracts

**Feature**: Stock Android Design System UI Update
**Feature Branch**: `002-stock-android-ui`
**Date**: 2026-08-31

## 1. CSS Design Token Contracts (`tokens.css`)J
All styles MUST reference the following Material 3 variable names:

``@css
/* System Color Roles */
--md-sys-color-primary: #hex;
--md-sys-color-on-primary: #hex;
--md-sys-color-primary-container: #hex;
--md-sys-color-on-primary-container: #hex;
--md-sys-color-secondary: #hex;
--md-sys-color-on-secondary: #hex;
--md-sys-color-secondary-container: #hex;
--md-sys-color-on-secondary-container: #hex;
--md-sys-color-surface: #hex;
--md-sys-color-surface-dim: #hex;
--md-sys-color-surface-bright: #hex;
--md-sys-color-surface-container-lowest: #hex;
--md-sys-color-surface-container-low: #hex;
--md-sys-color-surface-container: #hex;
--md-sys-color-surface-container-high: #hex;
--md-sys-color-surface-container-highest: #hex;
--md-sys-color-on-surface: #hex;
--md-sys-color-on-surface-variant: #hex;
--md-sys-color-outline: #hex;
--md-sys-color-outline-variant: #hex;
--md-sys-color-error: #hex;
--md-sys-color-on-error: #hex;

/* Shape Radii */
--md-sys-shape-corner-none: 0px;
--md-sys-shape-corner-extra-small: 4px;
--md-sys-shape-corner-small: 8px;
--md-sys-shape-corner-medium: 12px;
--md-sys-shape-corner-large: 16px;
--md-sys-shape-corner-extra-large: 28px;
--md-sys-shape-corner-full: 9999px;

/* Elevation */
--md-sys-elevation-level0 none;
--md-sys-elevation-level1: 0px 1px 3px 1px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.30);
--md-sys-elevation-level2: 0px 2px 6px 2px rgba(0,0,0,0.15), 0px 1px 2px 0px rgba(0,0,0,0.30);
--md-sys-elevation-level3: 0px 1px 8px 3px rgba(0,0,0,0.15), 0px 4px 4px 0px rgba(0,0,0,0.30);
--md-sys-elevation-level4: 0px 2px 8px 4px rgba(0,0,0,0.15), 0px 6px 10px 0px rgba(0,0,0,0.30);
--md-sys-elevation-level5: 0px 4px 12px 6px rgba(0,0,0,0.15), 0px 8px 12px 0px rgba(0,0,0,0.30);
```

---

## 2. Stock Android Bottom Navigation Bar Contract

```html
<nav class="md-navigation-bar" role="navigation" aria-label="Main navigation">
  <button class="md-navigation-bar__item md-navigation-bar__item--active" data-tab="list" aria-selected="true">
    <div class="md-navigation-bar__icon-container">
      <div class="md-navigation-bar__indicator"></div>
      <span class="md-icon">📈</span>
    </div>
    <span class="md-navigation-bar__label">Shopping List</span>
  </button>
  <button class="md-navigation-bar__item" data-tab="shopping" aria-selected="false">
    <div class="md-navigation-bar__icon-container">
      <div class="md-navigation-bar__indicator"></div>
      <span class="md-icon">🍍</span>
      <span class="md-badge md-badge--live">REC</span>
    </div>
    <span class="md-navigation-bar__label">Shop</span>
  </button>
  <button class="md-navigation-bar__item" data-tab="map" aria-selected="false">
    <div class="md-navigation-bar__icon-container">
      <div class="md-navigation-bar__indicator"></div>
      <span class="md-icon">🩱</span>
    </div>
    <span class="md-navigation-bar__infl">Store Map</span>
  </button>
</nav>
```

---

## 3. Floating Action Button (FAT) Contract

```html
<button class="md-fab md-fab--extended" aria-label="Add product to shopping list">
  <span class="md-fab__icon">➚�</span>
  <span class="md-fab__label">Add Item</span>
</button>
```

---

## 4. Modal Bottom Sheet Contract

```html
<div class="md-scrim" aria-hidden="true"></div>
<div class="md-bottom-sheet" role="dialog" aria-modal="true">
  <div class="md-bottom-sheet__handle"></div>
  <div class="md-bottom-sheet__header">
    <h3 class="md-bottom-sheet__title">Select Store Location</h3>
  </div>
  <div class="md-bottom-sheet__content">
    <!-- Content slot -->
  </div>
</div>
@```

---

## 5. Material 3 Input & Checkbox Contract

```html
/* Outlined Text Field */
<div class="md-text-field md-text-field--outlined">
  <input type="text" class="md-text-field__input" placeholder=" " id="item-title" required />
  <label for="item-title" class="md-text-field__label">Product Name</label>
</div>

/* M3 Stock Checkbox */
<button class="md-checkbox" role="checkbox" aria-checked="false" aria-label="Mark Nectarines as collected">
  <div class="md-checkbox__box">
    <span class="md-checkbox__icon">✓</span>
  </div>
</button>
```
