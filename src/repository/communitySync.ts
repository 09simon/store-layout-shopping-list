import { db } from './db';
import { calculateWPFStoreLayout } from '../engine/wpfConsensus';

export class CommunitySyncService {
  async processStoreLogs(storeId: string): Promise<boolean> {
    const logs = await db.getSequenceLogs(storeId);
    if (!logs || logs.length === 0) {
      return false;
    }

    const graph = calculateWPFStoreLayout(storeId, logs);
    await db.saveLayoutGraph(graph);

    // Update store custom map indicator
    const stores = await db.getStores();
    const store = stores.find(s => s.id === storeId);
    if (store) {
      store.hasCustomMap = true;
      store.updatedAt = new Date().toISOString();
      await db.saveStore(store);
    }

    return true;
  }
}

export const communitySyncService = new CommunitySyncService();
