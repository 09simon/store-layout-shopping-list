import { describe, it, expect } from 'vitest';
import { sortListItemsForStore } from '../../src/engine/routeSorter';
import { ListItem } from '../../src/models/types';

describe('User Story 2: Physical Route Sorting Engine', () => {
  it('should sort list items matching physical store progression for Tesco Szentpéteri kapu', async () => {
    const items: ListItem[] = [
      { id: '1', listId: 'L1', title: 'Toothpaste', categoryKey: 'personal_care', isCollected: false, calculatedSortIndex: 0 },
      { id: '2', listId: 'L1', title: 'Nectarines', categoryKey: 'produce', isCollected: false, calculatedSortIndex: 0 },
      { id: '3', listId: 'L1', title: 'Toilet paper', categoryKey: 'household', isCollected: false, calculatedSortIndex: 0 },
      { id: '4', listId: 'L1', title: 'Whole wheat crescent roll', categoryKey: 'bakery', isCollected: false, calculatedSortIndex: 0 },
      { id: '5', listId: 'L1', title: 'Bulgur', categoryKey: 'pantry_staples', isCollected: false, calculatedSortIndex: 0 },
      { id: '6', listId: 'L1', title: 'Pick winter salami', categoryKey: 'cold_cuts', isCollected: false, calculatedSortIndex: 0 }
    ];

    const sorted = await sortListItemsForStore(items, 'tesco-miskolc-szentpeteri');

    const sortedTitles = sorted.map(i => i.title);
    expect(sortedTitles).toEqual([
      'Nectarines',
      'Whole wheat crescent roll',
      'Pick winter salami',
      'Bulgur',
      'Toilet paper',
      'Toothpaste'
    ]);
  });
});
