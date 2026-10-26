import { ListItem } from '../models/types';
import { CATEGORY_MAP, DEFAULT_CATEGORIES } from '../engine/defaultLayouts';

export class ListViewComponent {
  private container: HTMLElement;
  private onToggleItem: (itemId: string) => void;
  private onDeleteItem: (itemId: string) => void;
  private filterCategoryKey: string | null = null;

  constructor(
    container: HTMLElement,
    onToggleItem: (itemId: string) => void,
    onDeleteItem: (itemId: string) => void
  ) {
    this.container = container;
    this.onToggleItem = onToggleItem;
    this.onDeleteItem = onDeleteItem;
  }

  render(items: ListItem[], storeName?: string): void {
    if (!items || items.length === 0) {
      this.container.innerHTML = `
        <div class="md-empty-state">
          <div class="md-empty-state__icon">🛒</div>
          <h3 class="md-typescale-title-large">Your shopping list is empty</h3>
          <p class="md-typescale-body-medium md-text-secondary">Tap the "Add Item" button below to add products sorted by store layout.</p>
        </div>
      `;
      return;
    }

    const sortedItems = [...items].sort((a, b) => a.calculatedSortIndex - b.calculatedSortIndex);
    const uncollectedCount = items.filter(i => !i.isCollected).length;
    const collectedCount = items.filter(i => i.isCollected).length;

    // Filter items if a filter is active
    const filteredItems = this.filterCategoryKey
      ? sortedItems.filter(item => item.categoryKey === this.filterCategoryKey)
      : sortedItems;

    // Distinct categories in the list for filter chips
    const presentCategoryKeys = Array.from(new Set(items.map(i => i.categoryKey)));

    this.container.innerHTML = `
      <div class="md-list-container">
        <!-- List Header Bar -->
        <div class="md-list-subhead">
          <div class="md-list-subhead__info">
            <span class="md-typescale-title-medium">${uncollectedCount} remaining</span>
            ${collectedCount > 0 ? `<span class="md-typescale-body-small md-text-secondary">(${collectedCount} collected)</span>` : ''}
          </div>
          <div class="md-badge ${storeName ? 'md-badge--primary' : 'md-badge--neutral'}">
            ${storeName ? `📍 Shelf-Sorted: ${storeName}` : '📦 Default Category Order'}
          </div>
        </div>

        <!-- Filter Chips Carousel / Row -->
        ${presentCategoryKeys.length > 1 ? `
          <div class="md-chip-carousel" role="toolbar" aria-label="Filter items by category">
            <button 
              class="md-chip md-chip--filter ${this.filterCategoryKey === null ? 'md-chip--selected' : ''}" 
              data-cat="all"
            >
              <span class="md-chip__label">All (${items.length})</span>
            </button>
            ${presentCategoryKeys.map(catKey => {
              const cat = CATEGORY_MAP.get(catKey);
              const isSelected = this.filterCategoryKey === catKey;
              const count = items.filter(i => i.categoryKey === catKey).length;
              return `
                <button 
                  class="md-chip md-chip--filter ${isSelected ? 'md-chip--selected' : ''}" 
                  data-cat="${catKey}"
                >
                  <span class="md-chip__icon">${cat?.icon || '📦'}</span>
                  <span class="md-chip__label">${cat?.name || catKey} (${count})</span>
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Items List Group -->
        <div class="md-items-stack" role="list">
          ${filteredItems.map((item, idx) => {
            const cat = CATEGORY_MAP.get(item.categoryKey);
            const icon = cat ? cat.icon : '📦';
            const catName = cat ? cat.name : item.categoryKey;

            return `
              <div 
                class="md-card md-list-item-card ${item.isCollected ? 'md-list-item-card--collected' : ''}" 
                data-id="${item.id}"
                role="listitem"
              >
                <div class="md-list-item-card__index">${idx + 1}</div>
                
                <button 
                  class="md-checkbox ${item.isCollected ? 'md-checkbox--checked' : ''}" 
                  data-action="toggle"
                  role="checkbox"
                  aria-checked="${item.isCollected ? 'true' : 'false'}"
                  aria-label="Toggle ${item.title}"
                >
                  <div class="md-checkbox__box">
                    <span class="md-checkbox__icon">${item.isCollected ? '✓' : ''}</span>
                  </div>
                </button>

                <div class="md-list-item-card__content">
                  <span class="md-list-item-card__title ${item.isCollected ? 'md-list-item-card__title--struck' : ''}">
                    ${item.title}
                  </span>
                  <span class="md-list-item-card__subtitle">
                    <span class="cat-icon">${icon}</span> ${catName}
                  </span>
                </div>

                <button 
                  class="md-icon-button md-icon-button--standard delete-btn" 
                  data-action="delete" 
                  title="Remove ${item.title}" 
                  aria-label="Remove ${item.title}"
                >
                  ✕
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Filter chip click handlers
    this.container.querySelectorAll('.md-chip-carousel .md-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const cat = (e.currentTarget as HTMLElement).getAttribute('data-cat');
        this.filterCategoryKey = cat === 'all' ? null : cat;
        this.render(items, storeName);
      });
    });

    // Toggle handlers
    this.container.querySelectorAll('[data-action="toggle"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.currentTarget as HTMLElement).closest('.md-list-item-card');
        const id = card?.getAttribute('data-id');
        if (id) this.onToggleItem(id);
      });
    });

    // Delete handlers
    this.container.querySelectorAll('[data-action="delete"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.currentTarget as HTMLElement).closest('.md-list-item-card');
        const id = card?.getAttribute('data-id');
        if (id) this.onDeleteItem(id);
      });
    });
  }
}
