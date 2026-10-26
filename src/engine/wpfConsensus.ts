import { SequenceLog, StoreLayoutGraph } from '../models/types';
import { DEFAULT_SECTION_SEQUENCE } from './defaultLayouts';

export function calculateWPFStoreLayout(
  storeId: string,
  logs: SequenceLog[],
  availableCategories: string[] = DEFAULT_SECTION_SEQUENCE
): StoreLayoutGraph {
  const nodeWeights: Record<string, number> = {};
  const edgeWeights: Record<string, Record<string, number>> = {};

  // Initialize node and edge weight maps
  for (const cat of availableCategories) {
    nodeWeights[cat] = 0;
    edgeWeights[cat] = {};
    for (const target of availableCategories) {
      edgeWeights[cat][target] = 0;
    }
  }

  // Process all logs
  for (const log of logs) {
    const picks = log.picks;
    for (let i = 0; i < picks.length; i++) {
      const sourceCat = picks[i].categoryKey;
      if (nodeWeights[sourceCat] !== undefined) {
        nodeWeights[sourceCat] += 1;
      }

      // Record pairwise transitions with distance decay
      for (let j = i + 1; j < picks.length; j++) {
        const targetCat = picks[j].categoryKey;
        if (sourceCat !== targetCat && edgeWeights[sourceCat] && edgeWeights[sourceCat][targetCat] !== undefined) {
          const distance = j - i;
          const weight = 1 / distance; // 1.0 for adjacent, 0.5 for distance 2, etc.
          edgeWeights[sourceCat][targetCat] += weight;
        }
      }
    }
  }

  // Topological sort based on net pairwise precedence score
  const scores: Record<string, number> = {};
  for (const cat of availableCategories) {
    let netScore = 0;
    for (const other of availableCategories) {
      if (cat !== other) {
        const forward = edgeWeights[cat]?.[other] || 0;
        const backward = edgeWeights[other]?.[cat] || 0;
        netScore += (forward - backward);
      }
    }
    scores[cat] = netScore;
  }

  // Sort categories by net precedence score descending
  const computedOrder = [...availableCategories].sort((a, b) => {
    const scoreDiff = scores[b] - scores[a];
    if (Math.abs(scoreDiff) > 0.001) {
      return scoreDiff;
    }
    // Maintain default order if tied
    return availableCategories.indexOf(a) - availableCategories.indexOf(b);
  });

  return {
    storeId,
    nodeWeights,
    edgeWeights,
    computedOrder
  };
}
