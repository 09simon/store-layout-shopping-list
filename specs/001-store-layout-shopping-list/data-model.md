# Data Model: Community-Driven Store Layout Shopping List with Stock Android UI

## Entities & Schemas

### 1. Store Location (`Store`)
Represents a physical supermarket location.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String (UUID) | Yes | Unique store location identifier |
| `chain` | String | Yes | Supermarket chain (e.g. "Tesco") |
| `name` | String | Yes | Store branch name (e.g. "Szentpéteri kapu") |
| `address` | String | Yes | Street address |
| `city` | String | Yes | City name (e.g. "Miskolc") |
| `latitude` | Number | No | Geolocation latitude |
| `longitude` | Number | No | Geolocation longitude |
| `hasCustomMap` | Boolean | Yes | `true` if community sequence logs exist, `false` if using fallback template |
| `updatedAt` | String (ISO-8601) | Yes | Timestamp of last layout graph update |

---

### 2. Shopping List (`ShoppingList`)
User-created shopping list instance.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String (UUID) | Yes | Unique shopping list identifier |
| `title` | String | Yes | Title of list (e.g. "Weekly Grocery Run") |
| `storeId` | String (UUID) | No | Currently selected target store ID |
| `status` | Enum | Yes | `DRAFT`, `SHOPPING_ACTIVE`, `COMPLETED` |
| `createdAt` | String (ISO-8601) | Yes | List creation timestamp |
| `updatedAt` | String (ISO-8601) | Yes | List last modification timestamp |

---

### 3. List Item (`ListItem`)
Individual item within a shopping list.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String (UUID) | Yes | Item entry identifier |
| `listId` | String (UUID) | Yes | Foreign key to `ShoppingList` |
| `title` | String | Yes | Product name (e.g. "Nectarines", "Pick winter salami") |
| `categoryKey` | String | Yes | Normalized section category (e.g. `produce`, `bakery`, `cold_cuts`, `personal_care`) |
| `isCollected` | Boolean | Yes | `true` if picked during shopping trip |
| `collectedOrder` | Number | No | 1-based sequential order index recorded during shopping mode |
| `collectedAt` | String (ISO-8601) | No | Exact timestamp item was marked collected |
| `calculatedSortIndex` | Number | Yes | Computed physical sequence position in store layout |

---

### 4. Shopping Sequence Log (`SequenceLog`)
Recorded picking sequence from a completed shopping session, used for consensus learning.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | String (UUID) | Yes | Sequence log identifier |
| `storeId` | String (UUID) | Yes | Target store location ID |
| `tripStartedAt` | String (ISO-8601) | Yes | Shopping trip start time |
| `tripCompletedAt` | String (ISO-8601) | Yes | Shopping trip end time |
| `picks` | Array\<SequencePick\> | Yes | Ordered collection of item pick events |

#### Sub-object: `SequencePick`
- `categoryKey` (String): Section category ID
- `itemTitle` (String): Product title
- `sequenceOrder` (Number): 1-based index in trip
- `timestamp` (ISO-8601): Pick timestamp

---

### 5. Store Layout Graph (`StoreLayoutGraph`)
Aggregated directed graph representing physical section progression for a store location.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `storeId` | String (UUID) | Yes | Store location ID |
| `nodeWeights` | Record<String, Number> | Yes | Total pick count per category node |
| `edgeWeights` | Record<String, Record<String, Number>> | Yes | Pairwise transition matrix ($W(A, B)$) |
| `computedOrder` | Array\<String\> | Yes | Ordered category keys derived via Weighted Pairwise Frequency topological sort |

---

### 6. Theme & Android Navigation State (`ThemeAndNavigation`)
Tracks application theme mode and Stock Android navigation destination.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `themeMode` | Enum | Yes | `light`, `dark`, or `system` |
| `activeTab` | Enum | Yes | `list`, `stores`, `layout`, `shopping` |
| `badgeCounts` | Record<String, Number> | No | Numerical notification badge values per destination |
| `isLiveShopping`| Boolean | Yes | Active pulse badge state on Shopping Mode destination |

---

## Default Fallback Category Sequence

When a store location has no community sequence logs (`hasCustomMap = false`), the system applies the default supermarket department template:

1. `entrance_promotions` (Promotions)
2. `produce` (Fruit & Vegetables)
3. `plant_milks` (Plant-based drinks)
4. `bakery` (Bakery & Pastries)
5. `dairy` (Refrigerated Dairy)
6. `cold_cuts` (Hams, Salamis, Pre-packaged Meats)
7. `pantry_staples` (Flour, Oil, Rice, Pasta, Spices)
8. `beverages_cereal` (Coffee, Tea, Cereal)
9. `household` (Paper products, Cleaning, Rodent control)
10. `personal_care` (Hygiene, Shower gel, Toothpaste)
11. `checkout` (Front of store)
