import { describe, it, expect, beforeEach } from 'vitest';
import { storeRepository } from '../../src/repository/storeRepository';
import { sortListItemsForStore } from '../../src/engine/routeSorter';
import { sequenceLoggerService } from '../../src/repository/sequenceLogger';
import { communitySyncService } from '../../src/repository/communitySync';
import { db } from '../../src/repository/db';

describe('Quickstart Integration Validation: Tesco Szentpéteri Kapu Trip', () => {
  beforeEach(async () => {
    const lists = await db.getLists();
    for (const l of lists) {
      await db.deleteList(l.id);
    }
  });

  it('should execute end-to-end shopping trip workflow matching Tesco Szentpéteri Kapu layout', async () => {
    // 1. Create list
    const list = await storeRepository.createList('Tesco Miskolc Trip', 'tesco-miskolc-szentpeteri');
    
    // 2. Add products from user prompt trace
    await storeRepository.addListItem(list.id, 'Nectarines');
    await storeRepository.addListItem(list.id, 'Organic rice drink');
    await storeRepository.addListItem(list.id, 'Whole wheat crescent roll');
    await storeRepository.addListItem(list.id, 'Pick winter salami');
    await storeRepository.addListItem(list.id, 'Fine flour');
    await storeRepository.addListItem(list.id, 'Bulgur');
    await storeRepository.addListItem(list.id, 'Rat poison');
    await storeRepository.addListItem(list.id, 'Toothpaste');

    // 3. Fetch list and sort for store route
    const fetchedList = await storeRepository.getListById(list.id);
    expect(fetchedList?.items?.length).toBe(8);

    const sortedItems = await sortListItemsForStore(fetchedList!.items!, 'tesco-miskolc-szentpeteri');
    const sortedTitles = sortedItems.map(i => i.title);

    // Verify physical route order
    expect(sortedTitles).toEqual([
      'Nectarines',
      'Organic rice drink',
      'Whole wheat crescent roll',
      'Pick winter salami',
      'Fine flour',
      'Bulgur',
      'Rat poison',
      'Toothpaste'
    ]);

    // 4. Simulate Live Shopping Mode sequence pick logging
    sequenceLoggerService.startShoppingTrip();
    for (const item of sortedItems) {
      const toggled = await storeRepository.toggleListItem(item.id);
      sequenceLoggerService.recordPick(toggled!);
    }

    const log = await sequenceLoggerService.finishShoppingTrip('tesco-miskolc-szentpeteri');
    expect(log?.picks.length).toBe(8);

    // 5. Aggregate community WPF consensus graph
    const syncResult = await communitySyncService.processStoreLogs('tesco-miskolc-szentpeteri');
    expect(syncResult).toBe(true);

    const graph = await db.getLayoutGraph('tesco-miskolc-szentpeteri');
    expect(graph).toBeDefined();
    expect(graph?.computedOrder).toBeDefined();
  });
});
