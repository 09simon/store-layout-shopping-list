import { SequenceLog, SequencePick, ListItem } from '../models/types';
import { db } from './db';

export class SequenceLoggerService {
  private activeTripStartedAt: string | null = null;
  private activePicks: SequencePick[] = [];

  startShoppingTrip(): void {
    this.activeTripStartedAt = new Date().toISOString();
    this.activePicks = [];
  }

  recordPick(item: ListItem): void {
    const pick: SequencePick = {
      itemTitle: item.title,
      categoryKey: item.categoryKey,
      sequenceOrder: this.activePicks.length + 1,
      timestamp: new Date().toISOString()
    };
    this.activePicks.push(pick);
  }

  async finishShoppingTrip(storeId: string): Promise<SequenceLog | null> {
    if (!this.activeTripStartedAt || this.activePicks.length === 0) {
      return null;
    }

    const log: SequenceLog = {
      id: 'seq-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      storeId,
      tripStartedAt: this.activeTripStartedAt,
      tripCompletedAt: new Date().toISOString(),
      picks: [...this.activePicks]
    };

    await db.saveSequenceLog(log);
    
    // Reset state
    this.activeTripStartedAt = null;
    this.activePicks = [];

    return log;
  }

  getActivePicksCount(): number {
    return this.activePicks.length;
  }
}

export const sequenceLoggerService = new SequenceLoggerService();
