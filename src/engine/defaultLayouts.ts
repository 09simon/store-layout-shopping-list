import { CategoryDefinition } from '../models/types';

export const DEFAULT_CATEGORIES: CategoryDefinition[] = [
  { key: 'entrance_promotions', name: 'Promotions & Seasonal', icon: '🏷️', defaultOrder: 1 },
  { key: 'produce', name: 'Fruit & Vegetables', icon: '🥬', defaultOrder: 2 },
  { key: 'plant_milks', name: 'Plant-Based Milks & Drinks', icon: '🥛', defaultOrder: 3 },
  { key: 'bakery', name: 'Bakery & Pastries', icon: '🥐', defaultOrder: 4 },
  { key: 'dairy', name: 'Refrigerated Dairy & Cheese', icon: '🧀', defaultOrder: 5 },
  { key: 'cold_cuts', name: 'Cold Cuts, Salamis & Fresh Meats', icon: '🥩', defaultOrder: 6 },
  { key: 'pantry_staples', name: 'Flour, Pasta, Cooking Oil & Spices', icon: '🌾', defaultOrder: 7 },
  { key: 'beverages_cereal', name: 'Coffee, Tea, Cereal & Drinks', icon: '☕', defaultOrder: 8 },
  { key: 'household', name: 'Household Paper, Cleaning & Pest Control', icon: '🧻', defaultOrder: 9 },
  { key: 'personal_care', name: 'Shower Gel, Toothpaste & Personal Hygiene', icon: '🧼', defaultOrder: 10 },
  { key: 'checkout', name: 'Front of Store & Checkout', icon: '🛒', defaultOrder: 11 }
];

export const CATEGORY_MAP = new Map<string, CategoryDefinition>(
  DEFAULT_CATEGORIES.map(cat => [cat.key, cat])
);

export const DEFAULT_SECTION_SEQUENCE: string[] = DEFAULT_CATEGORIES.map(c => c.key);

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  produce: ['nectarine', 'nectarines', 'tomato', 'tomatoes', 'spinach', 'baby spinach', 'cucumber', 'pepper', 'bell pepper', 'apple', 'banana', 'lettuce', 'lamb\'s lettuce', 'fruit', 'vegetable', 'onion', 'potato'],
  plant_milks: ['rice drink', 'organic rice drink', 'almond milk', 'oat milk', 'soy milk', 'plant milk', 'vegan milk'],
  bakery: ['bread', 'crescent roll', 'whole wheat crescent roll', 'roll', 'croissant', 'baguette', 'pastry', 'bun'],
  dairy: ['cheese', 'milk', 'yogurt', 'butter', 'sour cream', 'cottage cheese', 'guda', 'cheddar'],
  cold_cuts: ['salami', 'pick winter salami', 'ham', 'sausage', 'cold cut', 'bacon', 'chicken breast', 'meat', 'pork', 'beef'],
  pantry_staples: ['flour', 'fine flour', 'bulgur', 'rice', 'oil', 'cooking oil', 'vinegar', 'spice', 'spices', 'pasta', 'spaghetti', 'sugar', 'salt'],
  beverages_cereal: ['coffee', 'tea', 'cereal', 'oats', 'granola', 'juice', 'water', 'soda'],
  household: ['toilet paper', 'paper towel', 'paper towels', 'rodent control', 'rat poison', 'detergent', 'soap', 'cleaner', 'trash bag', 'sponge'],
  personal_care: ['shower gel', 'toothpaste', 'shampoo', 'hygiene', 'tissue', 'paper tissue', 'tissues', 'deodorant', 'soap']
};

export function inferCategoryFromTitle(itemTitle: string): string {
  const normalized = itemTitle.trim().toLowerCase();
  for (const [catKey, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => normalized.includes(kw))) {
      return catKey;
    }
  }
  return 'pantry_staples'; // Default fallback section
}
