import { db } from './db';
import { ShoppingList, ListItem, Store } from '../models/types';
import { inferCategoryFromTitle } from '../engine/defaultLayouts';

export class StoreRepository {
  async createList(title: string, storeId?: string): Promise<ShoppingList> {
    const list: ShoppingList = {
      id: 'list-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      title: title.trim() || 'Shopping List',
      storeId,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: []
    };
    await db.saveList(list);
    return list;
  }

  async getLists(): Promise<ShoppingList[]> {
    const lists = await db.getLists();
    for (const list of lists) {
      list.items = await db.getItemsByListId(list.id);
    }
    return lists;
  }

  async getListById(listId: string): Promise<ShoppingList | null> {
    const lists = await db.getLists();
    const list = lists.find(l => l.id === listId);
    if (!list) return null;
    list.items = await db.getItemsByListId(list.id);
    return list;
  }

  async addListItem(listId: string, title: string, categoryKey?: string): Promise<ListItem> {
    const inferredCategory = categoryKey || inferCategoryFromTitle(title);
    const item: ListItem = {
      id: 'item-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      listId,
      title: title.trim(),
      categoryKey: inferredCategory,
      isCollected: false,
      calculatedSortIndex: 999
    };
    await db.saveItem(item);
    
    // Update list timestamp
    const list = await this.getListById(listId);
    if (list) {
      list.updatedAt = new Date().toISOString();
      await db.saveList(list);
    }
    
    return item;
  }

  async toggleListItem(itemId: string): Promise<ListItem | null> {
    const items = await db.getItems();
    const item = items.find(i => i.id === itemId);
    if (!item) return null;
    item.isCollected = !item.isCollected;
    item.collectedAt = item.isCollected ? new Date().toISOString() : undefined;
    await db.saveItem(item);
    return item;
  }

  async deleteListItem(itemId: string): Promise<void> {
    await db.deleteItem(itemId);
  }

  async setListStore(listId: string, storeId: string): Promise<ShoppingList | null> {
    const list = await this.getListById(listId);
    if (!list) return null;
    list.storeId = storeId;
    list.updatedAt = new Date().toISOString();
    await db.saveList(list);
    return list;
  }

  async setListStatus(listId: string, status: ShoppingList['status']): Promise<ShoppingList | null> {
    const list = await this.getListById(listId);
    if (!list) return null;
    list.status = status;
    list.updatedAt = new Date().toISOString();
    await db.saveList(list);
    return list;
  }
}

export const storeRepository = new StoreRepository();
