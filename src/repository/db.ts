import { Store, ShoppingList, ListItem, SequenceLog, StoreLayoutGraph } from '../models/types';

class StorageAdapter {
  private listsKey = 'stt_shopping_lists';
  private itemsKey = 'stt_list_items';
  private storesKey = 'stt_stores';
  private logsKey = 'stt_sequence_logs';
  private graphsKey = 'stt_layout_graphs';

  private inMemoryStore = new Map<string, string>();

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
      } else {
        const raw = this.inMemoryStore.get(key);
        return raw ? JSON.parse(raw) : defaultValue;
      }
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      const jsonStr = JSON.stringify(value);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, jsonStr);
      }
      this.inMemoryStore.set(key, jsonStr);
    } catch {
      // Ignore in restricted environments
    }
  }

  // Shopping Lists
  async getLists(): Promise<ShoppingList[]> {
    return this.getItem<ShoppingList[]>(this.listsKey, []);
  }

  async saveList(list: ShoppingList): Promise<void> {
    const lists = await this.getLists();
    const idx = lists.findIndex(l => l.id === list.id);
    if (idx >= 0) {
      lists[idx] = list;
    } else {
      lists.push(list);
    }
    this.setItem(this.listsKey, lists);
  }

  async deleteList(listId: string): Promise<void> {
    const lists = (await this.getLists()).filter(l => l.id !== listId);
    this.setItem(this.listsKey, lists);
    const items = (await this.getItems()).filter(i => i.listId !== listId);
    this.setItem(this.itemsKey, items);
  }

  // List Items
  async getItems(): Promise<ListItem[]> {
    return this.getItem<ListItem[]>(this.itemsKey, []);
  }

  async getItemsByListId(listId: string): Promise<ListItem[]> {
    const items = await this.getItems();
    return items.filter(i => i.listId === listId);
  }

  async saveItem(item: ListItem): Promise<void> {
    const items = await this.getItems();
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      items[idx] = item;
    } else {
      items.push(item);
    }
    this.setItem(this.itemsKey, items);
  }

  async saveItemsBatch(newItems: ListItem[]): Promise<void> {
    const items = await this.getItems();
    for (const item of newItems) {
      const idx = items.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        items[idx] = item;
      } else {
        items.push(item);
      }
    }
    this.setItem(this.itemsKey, items);
  }

  async deleteItem(itemId: string): Promise<void> {
    const items = (await this.getItems()).filter(i => i.id !== itemId);
    this.setItem(this.itemsKey, items);
  }

  // Stores
  async getStores(): Promise<Store[]> {
    return this.getItem<Store[]>(this.storesKey, []);
  }

  async saveStore(store: Store): Promise<void> {
    const stores = await this.getStores();
    const idx = stores.findIndex(s => s.id === store.id);
    if (idx >= 0) {
      stores[idx] = store;
    } else {
      stores.push(store);
    }
    this.setItem(this.storesKey, stores);
  }

  // Sequence Logs
  async getSequenceLogs(storeId?: string): Promise<SequenceLog[]> {
    const logs = this.getItem<SequenceLog[]>(this.logsKey, []);
    return storeId ? logs.filter(l => l.storeId === storeId) : logs;
  }

  async saveSequenceLog(log: SequenceLog): Promise<void> {
    const logs = await this.getSequenceLogs();
    logs.push(log);
    this.setItem(this.logsKey, logs);
  }

  // Store Layout Graphs
  async getLayoutGraph(storeId: string): Promise<StoreLayoutGraph | null> {
    const graphs = this.getItem<Record<string, StoreLayoutGraph>>(this.graphsKey, {});
    return graphs[storeId] || null;
  }

  async saveLayoutGraph(graph: StoreLayoutGraph): Promise<void> {
    const graphs = this.getItem<Record<string, StoreLayoutGraph>>(this.graphsKey, {});
    graphs[graph.storeId] = graph;
    this.setItem(this.graphsKey, graphs);
  }
}

export const db = new StorageAdapter();
