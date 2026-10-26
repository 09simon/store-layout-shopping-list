import { describe, it, expect } from 'vitest';
import { calculateWPFStoreLayout } from '../../src/engine/wpfConsensus';
import { SequenceLog } from '../../src/models/types';

describe('User Story 4: Weighted Pairwise Frequency (WPF) Consensus Engine', () => {
  it('should compute physical store section sequence from crowdsourced shopping sequence logs', () => {
    const logs: SequenceLog[] = [
      {
        id: 'log1',
        storeId: 'tesco-miskolc-szentpeteri',
        tripStartedAt: '2026-08-30T20:00:00Z',
        tripCompletedAt: '2026-08-30T20:30:00Z',
        picks: [
          { itemTitle: 'Nectarines', categoryKey: 'produce', sequenceOrder: 1, timestamp: '' },
          { itemTitle: 'Organic rice drink', categoryKey: 'plant_milks', sequenceOrder: 2, timestamp: '' },
          { itemTitle: 'Whole wheat roll', categoryKey: 'bakery', sequenceOrder: 3, timestamp: '' },
          { itemTitle: 'Pick winter salami', categoryKey: 'cold_cuts', sequenceOrder: 4, timestamp: '' },
          { itemTitle: 'Bulgur', categoryKey: 'pantry_staples', sequenceOrder: 5, timestamp: '' },
          { itemTitle: 'Rat poison', categoryKey: 'household', sequenceOrder: 6, timestamp: '' },
          { itemTitle: 'Toothpaste', categoryKey: 'personal_care', sequenceOrder: 7, timestamp: '' }
        ]
      },
      {
        id: 'log2',
        storeId: 'tesco-miskolc-szentpeteri',
        tripStartedAt: '2026-08-30T21:00:00Z',
        tripCompletedAt: '2026-08-30T21:30:00Z',
        picks: [
          { itemTitle: 'Tomatoes', categoryKey: 'produce', sequenceOrder: 1, timestamp: '' },
          { itemTitle: 'Cheese', categoryKey: 'dairy', sequenceOrder: 2, timestamp: '' },
          { itemTitle: 'Fine flour', categoryKey: 'pantry_staples', sequenceOrder: 3, timestamp: '' },
          { itemTitle: 'Toilet paper', categoryKey: 'household', sequenceOrder: 4, timestamp: '' },
          { itemTitle: 'Shower gel', categoryKey: 'personal_care', sequenceOrder: 5, timestamp: '' }
        ]
      }
    ];

    const graph = calculateWPFStoreLayout('tesco-miskolc-szentpeteri', logs);

    expect(graph.computedOrder).toBeDefined();
    expect(graph.computedOrder.indexOf('produce')).toBeLessThan(graph.computedOrder.indexOf('pantry_staples'));
    expect(graph.computedOrder.indexOf('pantry_staples')).toBeLessThan(graph.computedOrder.indexOf('household'));
    expect(graph.computedOrder.indexOf('household')).toBeLessThan(graph.computedOrder.indexOf('personal_care'));
  });
});
