import { ListItem, Store } from '../models/types';
import { CATEGORY_MAP } from '../engine/defaultLayouts';

export class ShoppingModeComponent {
  private container: HTMLElement;
  private onPickItem: (itemId: string) => void;
  private onFinishTrip: () => void;

  constructor(
    container: HTMLElement,
    onPickItem: (itemId: string) => void,
    onFinishTrip: () => void
  ) {
    this.container = container;
    this.onPickItem = onPickItem;
    this.onFinishTrip = onFinishTrip;
  }

  render(items: ListItem[], store?: Store | null): void {
    const uncollected = items.filter(i => !i.isCollected).sort((a, b) => a.calculatedSortIndex - b.calculatedSortIndex);
    const collected = items.filter(i => i.isCollected).sort((a, b) => (a.collectedOrder || 0) - (b.collectedOrder || 0));

    const total = items.length;
    const count = collected.length;
    const progressPercent = total > 0 ? Math.round((count / total) * 100) : 0;

    this.container.innerHTML = `
      <div class="md-shopping-mode-view">
        <!-- Sticky Live Shopping Header Card -->
        <div class="md-card md-card--elevated md-shopping-header-card">
          <div class="md-shopping-header-card__top">
            <div>
              <div class="md-typescale-title-large md-flex-center-gap">
                <span>🛒 Live Shopping Mode</span>
              </div>
              <p class="md-typescale-body-small md-text-secondary">
                📍 ${store ? `${store.name}` : 'Default Supermarket Layout'}
              </p>
            </div>
            <span class="md-badge md-badge--live">🔴 REC LOG ACTIVE</span>
          </div>

          <!-- M3 Linear Progress Bar -->
          <div class="md-linear-progress-group">
            <div class="md-linear-progress-group__labels">
              <span class="md-typescale-label-medium">${count} of ${total} picked</span>
              <span class="md-typescale-label-medium">${progressPercent}%</span>
            </div>
            <div class="md-linear-progress" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
              <div class="md-linear-progress__indicator" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <button id="finish-trip-btn" class="md-button md-button--success md-button--large md-button--block" style="margin-top: 1rem;">
            <span class="md-button__icon">🏁</span>
            <span class="md-button__label">Finish & Submit Trip Sequence</span>
          </button>
        </div>

        <!-- Remaining Items Stream in Shelf Sequence -->
        <div class="md-shopping-stream">
          <div class="md-section-headline">
            <h3 class="md-typescale-title-medium">Next Items on Physical Shelf Route</h3>
          </div>

          ${uncollected.length === 0 ? `
            <div class="md-card md-card--tonal md-all-done-card">
              <div class="md-all-done-card__icon">🎉</div>
              <h4 class="md-typescale-title-medium">All items collected!</h4>
              <p class="md-typescale-body-small md-text-secondary">
                Tap "Finish & Submit Trip Sequence" above to submit picking orders and improve the store graph.
              </p>
            </div>
          ` : `
            <div class="md-pick-grid">
              ${uncollected.map((item, idx) => {
                const cat = CATEGORY_MAP.get(item.categoryKey);
                const icon = cat ? cat.icon : '📦';
                const catName = cat ? cat.name : item.categoryKey;
                const isNext = idx === 0;

                return `
                  <div class="md-card md-pick-card ${isNext ? 'md-pick-card--next' : ''}" data-id="${item.id}">
                    <div class="md-pick-card__leading">
                      <span class="md-pick-card__icon">${icon}</span>
                      ${isNext ? `<span class="md-badge md-badge--primary">NEXT STOP</span>` : ''}
                    </div>
                    <div class="md-pick-card__body">
                      <h4 class="md-pick-card__title">${item.title}</h4>
                      <p class="md-pick-card__dept">${catName}</p>
                    </div>
                    <button class="md-button md-button--filled md-button--pick" data-action="pick" aria-label="Mark ${item.title} collected">
                      <span class="md-button__icon">✓</span>
                      <span class="md-button__label">Got it</span>
                    </button>
                  </div>
                `;
              }).join('')}
            </div>
          `}

          <!-- Collected Section -->
          ${collected.length > 0 ? `
            <div class="md-collected-section">
              <div class="md-section-headline">
                <h3 class="md-typescale-title-small md-text-secondary">Picked Items (${collected.length})</h3>
              </div>
              <div class="md-chip-group">
                ${collected.map(item => `
                  <div class="md-chip md-chip--assist md-chip--success">
                    <span class="md-chip__icon">✓</span>
                    <span class="md-chip__label">${item.title}</span>
                    <span class="md-chip__badge">#${item.collectedOrder || ''}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-action="pick"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = (e.currentTarget as HTMLElement).closest('.md-pick-card');
        const id = card?.getAttribute('data-id');
        if (id) this.onPickItem(id);
      });
    });

    const finishBtn = this.container.querySelector('#finish-trip-btn');
    finishBtn?.addEventListener('click', () => {
      this.onFinishTrip();
    });
  }
}
