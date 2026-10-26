import { describe, it, expect, beforeEach } from 'vitest';
import { sequenceLoggerService } from '../../src/repository/sequenceLogger';
import { db } from '../../src/repository/db';
import { ListItem } from '../../src/models/types';

describe('User Story 3: Sequence Logger Service', () => {
  beforeEach(() => {
    sequenceLoggerService.startShoppingTrip();
  });

  it('should record sequential item picks during a shopping trip', async () => {
    const item1: ListItem = { id: '1', listId: 'L1', title: 'Got the nectarines', categoryKey: 'produce', isCollected: true, calculatedSortIndex: 10 };
    const item2: ListItem = { id: '2', listId: 'L1', title: 'Got the organic rice drink', categoryKey: 'plant_milks', isCollected: true, calculatedSortIndex: 20 };

    sequenceLoggerService.recordPick(item1);
    sequenceLoggerService.recordPick(item2);

    expect(sequenceLoggerService.getActivePicksCount()).toBe(2);

    const log = await sequenceLoggerService.finishShoppingTrip('tesco-miskolc-szentpeteri');
    expect(log).toBeDefined();
    expect(log?.storeId).toBe('tesco-miskolc-szentpeteri');
    expect(log?.picks.length).toBe(2);
    expect(log?.picks[0].categoryKey).toBe('produce');
    expect(log?.picks[1].categoryKey).toBe('plant_milks');

    const storedLogs = await db.getSequenceLogs('tesco-miskolc-szentpeteri');
    expect(storedLogs.length).toBeGreaterThan(0);
  });
});
