# API Contracts: Community-Driven Store Layout Shopping List

## Store Directory & Layout Endpoints

### 1. Search Stores
- **HTTP Method**: `GET`
- **Path**: `/api/stores`
- **Query Parameters**:
  - `q` (string, optional): Search string (e.g. "Tesco Miskolc")
  - `lat` (number, optional): Latitude
  - `lng` (number, optional): Longitude
- **Response (200 OK)**:
```json
[
  {
    "id": "store-tesco-miskolc-szentpeteri",
    "chain": "Tesco",
    "name": "Szentpéteri kapu",
    "city": "Miskolc",
    "address": "Szentpéteri kapu 103",
    "latitude": 48.1185,
    "longitude": 20.7892,
    "hasCustomMap": true,
    "updatedAt": "2026-08-30T22:00:00Z"
  }
]
```

---

### 2. Get Store Layout Sequence
- **HTTP Method**: `GET`
- **Path**: `/api/stores/{storeId}/layout`
- **Response (200 OK)**:
```json
{
  "storeId": "store-tesco-miskolc-szentpeteri",
  "isCommunityDerived": true,
  "sequence": [
    "entrance_promotions",
    "produce",
    "plant_milks",
    "bakery",
    "dairy",
    "cold_cuts",
    "pantry_staples",
    "household",
    "personal_care"
  ]
}
```

---

### 3. Submit Shopping Trip Sequence Log
- **HTTP Method**: `POST`
- **Path**: `/api/stores/{storeId}/sequence-logs`
- **Request Body**:
```json
{
  "tripStartedAt": "2026-08-30T21:00:00Z",
  "tripCompletedAt": "2026-08-30T21:30:00Z",
  "picks": [
    { "itemTitle": "Nectarines", "categoryKey": "produce", "sequenceOrder": 1, "timestamp": "2026-08-30T21:02:00Z" },
    { "itemTitle": "Organic rice drink", "categoryKey": "plant_milks", "sequenceOrder": 2, "timestamp": "2026-08-30T21:05:00Z" },
    { "itemTitle": "Whole wheat crescent roll", "categoryKey": "bakery", "sequenceOrder": 3, "timestamp": "2026-08-30T21:08:00Z" },
    { "itemTitle": "Pick winter salami", "categoryKey": "cold_cuts", "sequenceOrder": 4, "timestamp": "2026-08-30T21:12:00Z" },
    { "itemTitle": "Bulgur", "categoryKey": "pantry_staples", "sequenceOrder": 5, "timestamp": "2026-08-30T21:18:00Z" },
    { "itemTitle": "Rat poison", "categoryKey": "household", "sequenceOrder": 6, "timestamp": "2026-08-30T21:22:00Z" },
    { "itemTitle": "Toothpaste", "categoryKey": "personal_care", "sequenceOrder": 7, "timestamp": "2026-08-30T21:28:00Z" }
  ]
}
```
- **Response (202 Accepted)**:
```json
{
  "status": "QUEUED_FOR_AGGREGATION",
  "message": "Sequence log accepted for community layout updating."
}
```

---

## Local Client Service Interface (Offline Repository Contract)

### `StoreLayoutEngine` Interface (TypeScript Signature)

```typescript
interface StoreLayoutEngine {
  // Store management
  getStores(query?: string): Promise<Store[]>;
  getStoreLayout(storeId: string): Promise<string[]>;

  // List management
  createList(title: string): Promise<ShoppingList>;
  addListItem(listId: string, itemTitle: string, categoryKey?: string): Promise<ListItem>;
  
  // Physical route sorting
  sortListForStore(listId: string, storeId: string): Promise<ListItem[]>;

  // Interactive shopping mode
  startShoppingSession(listId: string, storeId: string): Promise<void>;
  markItemCollected(listId: string, itemId: string): Promise<ListItem>;
  finishShoppingSession(listId: string): Promise<SequenceLog>;
}
```
