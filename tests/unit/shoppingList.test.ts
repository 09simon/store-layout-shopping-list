import { describe, it, expect, beforeEach } from 'vitest';
import { storeRepository } from '../../src/repository/storeRepository';
import { db } from '../../src/repository/db';

describe('User Story 1: Shopping List Management', () => {
  beforeEach(async () => {
    // Reset local data
    const lists = await db.getLists();
    for (const l of lists) {
      await db.deleteList(l.id);
    }
  });

  it('should create a new shopping list', async () => {
    const list = await storeRepository.createList('Tesco Shopping Trip');
    expect(list.id).toBeDefined();
    expect(list.title).toBe('Tesco Shopping Trip');
    expect(list.status).toBe('DRAFT');

    const fetched = await storeRepository.getListById(list.id);
    expect(fetched).toBeDefined();
    expect(fetched?.title).toBe('Tesco Shopping Trip');
  });

  it('should add products to a shopping list with inferred categories', async () => {
    const list = await storeRepository.createList('Tesco Miskolc');
    const item1 = await storeRepository.addListItem(list.id, 'Nectarines');
    const item2 = await storeRepository.addListItem(list.id, 'Organic rice drink');
    const item3 = await storeRepository.addListItem(list.id, 'Pick winter salami');
    const item4 = await storeRepository.addListItem(list.id, 'Rat poison');

    expect(item1.categoryKey).toBe('produce');
    expect(item2.categoryKey).toBe('plant_milks');
    expect(item3.categoryKey).toBe('cold_cuts');
    expect(item4.categoryKey).toBe('household');

    const updatedList = await storeRepository.getListById(list.id);
    expect(updatedList?.items?.length).toBe(4);
  });

  it('should toggle collected state of list items', async () => {
    const list = await storeRepository.createList('Quick Run');
    const item = await storeRepository.addListItem(list.id, 'Toothpaste');
    expect(item.isCollected).toBe(false);

    const toggled = await storeRepository.toggleListItem(item.id);
    expect(toggled?.isCollected).toBe(true);
    expect(toggled?.collectedAt).toBeDefined();

    const toggledBack = await storeRepository.toggleListItem(item.id);
    expect(toggledBack?.isCollected).toBe(false);
  });
});
