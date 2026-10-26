export type ShoppingListStatus = 'DRAFT' | 'SHOPPING_ACTIVE' | 'COMPLETED';

export interface Store {
  id: string;
  chain: string;
  name: string;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  hasCustomMap: boolean;
  updatedAt: string;
}

export interface ListItem {
  id: string;
  listId: string;
  title: string;
  categoryKey: string;
  isCollected: boolean;
  collectedOrder?: number;
  collectedAt?: string;
  calculatedSortIndex: number;
}

export interface ShoppingList {
  id: string;
  title: string;
  storeId?: string;
  status: ShoppingListStatus;
  createdAt: string;
  updatedAt: string;
  items?: ListItem[];
}

export interface SequencePick {
  itemTitle: string;
  categoryKey: string;
  sequenceOrder: number;
  timestamp: string;
}

export interface SequenceLog {
  id: string;
  storeId: string;
  tripStartedAt: string;
  tripCompletedAt: string;
  picks: SequencePick[];
}

export interface StoreLayoutGraph {
  storeId: string;
  nodeWeights: Record<string, number>;
  edgeWeights: Record<string, Record<string, number>>;
  computedOrder: string[];
}

export interface CategoryDefinition {
  key: string;
  name: string;
  icon: string;
  defaultOrder: number;
}
