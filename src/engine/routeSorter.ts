import { ListItem, StoreLayoutGraph } from '../models/types';
import { DEFAULT_SECTION_SEQUENCE } from './defaultLayouts';
import { db } from '../repository/db';

export const TESCO_MISKOLC_SZENTPETERI_SEQUENCE: string[] = [
  'entrance_promotions',
  'produce',
  'plant_milks',
  'bakery',
  'dairy',
  'cold_cuts',
  'pantry_staples',
  'beverages_cereal',
  'household',
  'personal_care',
  'checkout'
];

export async function getStoreSectionSequence(storeId?: string): Promise<string[]> {
  if (!storeId) return DEFAULT_SECTION_SEQUENCE;

  // Specific preset for Tesco Szentpéteri kapu, Miskolc
  if (storeId === 'tesco-miskolc-szentpeteri') {
    const graph = await db.getLayoutGraph(storeId);
    if (graph && graph.computedOrder && graph.computedOrder.length > 0) {
      return graph.computedOrder;
    }
    return TESCO_MISKOLC_SZENTPETERI_SEQUENCE;
  }

  // General community graph lookup
  const graph = await db.getLayoutGraph(storeId);
  if (graph && graph.computedOrder && graph.computedOrder.length > 0) {
    return graph.computedOrder;
  }

  return DEFAULT_SECTION_SEQUENCE;
}

export async function sortListItemsForStore(items: ListItem[], storeId?: string): Promise<ListItem[]> {
  const sequence = await getStoreSectionSequence(storeId);
  const sequenceMap = new Map<string, number>(sequence.map((catKey, index) => [catKey, index]));

  return items.map(item => {
    const sectionIndex = sequenceMap.has(item.categoryKey)
      ? sequenceMap.get(item.categoryKey)!
      : 99; // Fallback to end of list for unmapped categories
    
    return {
      ...item,
      calculatedSortIndex: sectionIndex * 10
    };
  }).sort((a, b) => a.calculatedSortIndex - b.calculatedSortIndex);
}
