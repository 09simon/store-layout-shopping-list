# Phase 0 Research: Community-Driven Store Layout Shopping List with Stock Android UI

## Research Topic 1: Topological Sequence Consensus Algorithm

### Context
Community users log sequence order when shopping at specific retail store locations. Individual shopping logs may contain out-of-order picking, backtracking, missing items, or varying routes.

### Decision
Use **Weighted Pairwise Frequency (WPF)** with **Topological Directed Graph Sorting**:
1. For every consecutive item pick pair $(A \rightarrow B)$ in a single trip log, increment directed edge weight $W(A, B) += \frac{1}{\text{distance}(A, B)}$ where adjacent picks have maximum weight ($1.0$), and distant picks have decaying weight ($0.5, 0.25$).
2. Aggregate transition matrices across all trips for a specific `store_id`.
3. Detect and drop low-confidence back-edges (cycles caused by occasional backtracking) using a minimum weight threshold filter.
4. Execute DAG topological sort with edge-weight priority queues to derive the deterministic linear physical sequence of store sections and items.

### Rationale
- Robust against single-user backtracking or detours.
- Scales efficiently for thousands of store layout logs.
- Guarantees acyclic deterministic sorting for any list of products.

### Alternatives Considered
- **Simple First-Occurrence Indexing**: Discards subsequent revisits, but susceptible to noise if user starts trip at an unusual entrance.
- **Median Position Normalization**: Normalizes item pick sequence index to $0.0-1.0$; rejected because store traversal speed varies non-linearly across departments.

---

## Research Topic 2: Offline-First Data Architecture & Synchronization

### Context
Supermarkets often have weak or absent cellular connectivity. Shopping list management, item ticking, and sequence timestamping must be 100% reliable offline.

### Decision
Use **Local Storage Repository Pattern** with in-memory fallback:
1. All shopping lists, active trip items, store directory records, theme preferences, and recorded sequence logs are committed locally (`localStorage` and IndexedDB).
2. Repositories provide asynchronous transaction guarantees and domain-safe serialization.
3. Queued sequence logs are stored locally and synced when connectivity is established.

### Rationale
- Guarantees zero latency and 100% operation during active shopping inside physical stores.
- Clean repository abstraction decouples persistence from UI and domain algorithms.

### Alternatives Considered
- **Direct Online API Sync**: Rejected because network drops inside supermarkets cause UI hangs or lost sequence logs.
- **SessionStorage**: Rejected because session storage does not survive tab closure or multi-trip persistence.

---

## Research Topic 3: Store Location Directory & Spatial Store Identification

### Context
Users select a specific store branch (e.g., Tesco Supermarket at Szentpéteri kapu, Miskolc) to apply or contribute to its physical layout map.

### Decision
Implement a **Store Directory Engine** supporting:
1. Searchable store index by Chain Name, City, and Street Address.
2. Geolocation distance lookup (HTML5 Geolocation API) to recommend nearby stores within 500m radius.
3. Fallback layout template assignment for unmapped store locations.

### Rationale
- Allows precise branch-level map assignment without requiring manual coordinate inputs from users.
- Fallback template ensures a seamless user experience even for brand-new store entries.

---

## Research Topic 4: Stock Android Material Design 3 (Material You) Architecture

### Context
The user interface must authentically adopt Stock Android design elements from the latest Android version, including tonal palettes, surface elevations, bottom navigation with pill indicators, FAB, and dynamic theme switching.

### Decision
Implement a centralized CSS custom property token system (`tokens.css`) adhering to Material 3 specification:
1. **Color Roles**: Primary, Secondary, Tertiary, Surface, Surface Container levels (lowest to highest), On-Surface, Outline, Error.
2. **Component Geometry**: Rounded pill shapes for navigation indicators and chips (`--md-sys-shape-corner-full: 9999px`), 16–28px card corners.
3. **Theme Switching**: CSS `[data-theme="light"]` and `[data-theme="dark"]` root attribute selectors mapping tonal palettes dynamically.

### Rationale
- Zero runtime overhead: CSS custom properties provide instant theme changes without re-rendering component trees.
- Faithful adherence to Android design language without heavy external framework bloat.

### Alternatives Considered
- **Heavy UI Framework (e.g. Vuetify or Angular Material)**: Rejected to preserve lightweight runtime, fast load times, and vanilla component architecture.
- **Hardcoded Styles**: Rejected because it violates Constitution Principle III (Interface Consistency) and makes light/dark mode unmaintainable.

---

## Research Topic 5: Ergonomics & Touch Accessibility (48dp Touch Targets & WCAG AA)

### Context
In-store shopping requires one-handed mobile phone interaction while walking aisles with groceries or a cart.

### Decision
1. Enforce minimum $48\times 48\text{px}$ touch targets for all interactive buttons, list checkboxes, navigation items, and FAB.
2. Maintain WCAG AA contrast minimums ($4.5:1$ for normal text, $3:1$ for large text/icons) across both Light and Dark themes.
3. Implement prominent active indicators (e.g. rounded pills, tactile click feedback) and clear progress bars for in-store shopping.

### Rationale
- Prevents mis-taps during movement.
- Ensures high readability under varied store lighting conditions.
