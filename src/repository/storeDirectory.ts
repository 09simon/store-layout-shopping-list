import { Store } from '../models/types';
import { db } from './db';

export const SEED_STORES: Store[] = [
  {
    id: 'tesco-miskolc-szentpeteri',
    chain: 'Tesco',
    name: 'Tesco Supermarket - Szentpéteri kapu',
    city: 'Miskolc',
    address: 'Szentpéteri kapu 103, 3526 Miskolc',
    latitude: 48.1185,
    longitude: 20.7892,
    hasCustomMap: true,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'spar-miskolc-szinvapark',
    chain: 'SPAR',
    name: 'SPAR Supermarket - Szinva Park',
    city: 'Miskolc',
    address: 'Bajcsy-Zsilinszky út 2-4, 3527 Miskolc',
    latitude: 48.1021,
    longitude: 20.7915,
    hasCustomMap: false,
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tesco-szeged-rkos',
    chain: 'Tesco',
    name: 'Tesco Extra - Rókusi körút',
    city: 'Szeged',
    address: 'Rókusi krt. 42, 6724 Szeged',
    latitude: 46.2625,
    longitude: 20.1345,
    hasCustomMap: false,
    updatedAt: new Date().toISOString()
  }
];

export class StoreDirectoryService {
  async initDirectory(): Promise<void> {
    const existing = await db.getStores();
    if (existing.length === 0) {
      for (const store of SEED_STORES) {
        await db.saveStore(store);
      }
    }
  }

  async getAllStores(): Promise<Store[]> {
    await this.initDirectory();
    return db.getStores();
  }

  async getStoreById(storeId: string): Promise<Store | null> {
    const stores = await this.getAllStores();
    return stores.find(s => s.id === storeId) || null;
  }

  async searchStores(query: string): Promise<Store[]> {
    const stores = await this.getAllStores();
    const q = query.toLowerCase().trim();
    if (!q) return stores;
    return stores.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.chain.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q)
    );
  }
}

export const storeDirectoryService = new StoreDirectoryService();
