# Phase 0 Research: Community-Driven Store Layout Shopping List

## Research Topic 1: Topological Sequence Consensus Algorithm

### Context
Community users log sequence order when shopping at specific retail store locations. Individual shopping logs may contain out-of-order picking, backtracking, missing items, or varying routes.

### Decision
Use **Weighted Pairwise Frequency (WPF)** with **Topological Directed Graph Sorting**:
1. For every consecutive item pick pair $(A \rightarrow B)$ in a single trip log, increment directed edge weight $W(A, B) += \frac{1}{\text{distance}(A, B)}$ where adjacent picks have maximum weight ($1.0$), and distant picks have decaying weight ($0.5, 0.25$).
2. Aggregate transition matrices across all trips for a specific `store_id`.
3. Detect and drop low-confidence back-edges (cycles caused by occasional backtracking) using a minimum weight threshold filter.
4. Execute Kahn's algorithm or DAG topological sort with edge-weight priority queues to derive the deterministic linear physical sequence of store sections and items.

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
Use **IndexedDB** as the client primary storage engine wrapped in a lightweight repository pattern:
1. All shopping lists, active trip items, store directory caches, and recorded sequence logs are committed to local IndexedDB first.
2. Service Worker handles PWA offline caching of static web application assets.
3. A Background Sync Manager detects network restoration and asynchronously posts queued sequence logs to the community backend aggregation endpoint.

### Rationale
- Guarantees zero latency and 100% operation during active shopping inside physical stores.
- IndexedDB provides transaction safety and sufficient storage capacity across all modern mobile browsers.

### Alternatives Considered
- **LocalStorage**: Rejected due to 5MB storage ceiling and blocking synchronous API performance.
- **Direct Online API Sync**: Rejected because network drops inside supermarkets cause UI hangs or lost sequence logs.

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

## Research Topic 4: Application Tech Stack & Architectural Design

### Context
Need a lightweight, responsive web application aligned with workspace requirements, high performance, and minimal bundle overhead.

### Decision
- **Frontend Stack**: Vite + Vanilla JavaScript / Modern ES Modules, HTML5, Vanilla CSS with custom design tokens, SVG icons.
- **Backend / API Contracts**: Node.js REST API with JSON contracts (or mockable embedded REST layer for offline standalone running).
- **Testing**: Vitest for unit/integration tests of consensus graph algorithms, store sorting engines, and offline repository modules.
