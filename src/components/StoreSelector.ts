import { Store } from '../models/types';

export class StoreSelectorComponent {
  private container: HTMLElement;
  private onStoreSelected: (storeId: string) => void;
  private isSheetOpen: boolean = false;

  constructor(container: HTMLElement, onStoreSelected: (storeId: string) => void) {
    this.container = container;
    this.onStoreSelected = onStoreSelected;
  }

  render(stores: Store[], activeStoreId?: string): void {
    const activeStore = stores.find(s => s.id === activeStoreId);

    this.container.innerHTML = `
      <div class="md-card md-card--tonal md-store-card">
        <div class="md-store-card__body">
          <div class="md-store-card__icon-box">📍</div>
          <div class="md-store-card__info">
            <span class="md-typescale-label-small md-text-secondary">ACTIVE STORE LOCATION</span>
            <h2 class="md-typescale-title-medium md-store-card__title">
              ${activeStore ? `${activeStore.name}` : 'No Store Selected'}
            </h2>
            <p class="md-typescale-body-small md-text-secondary">
              ${activeStore ? activeStore.address : 'Using default department shelf sequence'}
            </p>
          </div>
          <button id="open-store-sheet-btn" class="md-button md-button--tonal md-button--small">
            ${activeStore ? 'Change' : 'Select'}
          </button>
        </div>
      </div>
    `;

    const openBtn = this.container.querySelector('#open-store-sheet-btn');
    openBtn?.addEventListener('click', () => {
      this.openStoreSheet(stores, activeStoreId);
    });

    if (this.isSheetOpen) {
      this.renderStoreSheet(stores, activeStoreId);
    }
  }

  private openStoreSheet(stores: Store[], activeStoreId?: string): void {
    this.isSheetOpen = true;
    this.renderStoreSheet(stores, activeStoreId);
    const searchInput = document.getElementById('store-sheet-search') as HTMLInputElement;
    setTimeout(() => searchInput?.focus(), 150);
  }

  private closeStoreSheet(): void {
    this.isSheetOpen = false;
    const sheetRoot = document.getElementById('modal-sheet-root');
    if (sheetRoot) sheetRoot.innerHTML = '';
  }

  private renderStoreSheet(stores: Store[], activeStoreId?: string): void {
    const sheetRoot = document.getElementById('modal-sheet-root');
    if (!sheetRoot) return;

    sheetRoot.innerHTML = `
      <div class="md-scrim" id="store-scrim"></div>
      <div class="md-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="store-sheet-title">
        <div class="md-bottom-sheet__drag-handle"></div>
        <div class="md-bottom-sheet__header">
          <div class="md-bottom-sheet__headline">
            <h3 id="store-sheet-title" class="md-typescale-title-large">Select Supermarket</h3>
            <p class="md-typescale-body-small md-text-secondary">Routes and shelf orders adapt automatically</p>
          </div>
          <button id="close-store-sheet-btn" class="md-icon-button" aria-label="Close store selector">✕</button>
        </div>

        <div class="md-bottom-sheet__content">
          <div class="md-text-field md-text-field--outlined" style="margin-bottom: 1rem;">
            <input type="text" id="store-sheet-search" class="md-text-field__input" placeholder=" " autocomplete="off" />
            <label for="store-sheet-search" class="md-text-field__label">Search city or store name...</label>
          </div>

          <div class="md-store-options-list">
            ${stores.map(store => {
              const isSelected = store.id === activeStoreId;
              return `
                <div 
                  class="md-card md-store-option-card ${isSelected ? 'md-store-option-card--active' : ''}" 
                  data-id="${store.id}"
                  role="button"
                  tabindex="0"
                >
                  <div class="md-store-option-card__radio">
                    <div class="md-radio-circle ${isSelected ? 'md-radio-circle--selected' : ''}"></div>
                  </div>
                  <div class="md-store-option-card__content">
                    <div class="md-store-option-card__title">${store.name}</div>
                    <div class="md-typescale-body-small md-text-secondary">${store.address} (${store.city})</div>
                    ${store.hasCustomMap ? `
                      <span class="md-badge md-badge--success" style="margin-top: 0.35rem;">
                        👥 Community Crowd-Sourced Map
                      </span>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    sheetRoot.querySelector('#store-scrim')?.addEventListener('click', () => this.closeStoreSheet());
    sheetRoot.querySelector('#close-store-sheet-btn')?.addEventListener('click', () => this.closeStoreSheet());

    const searchInput = sheetRoot.querySelector('#store-sheet-search') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      const q = (e.target as HTMLInputElement).value.toLowerCase();
      const options = sheetRoot.querySelectorAll('.md-store-option-card');
      options.forEach(opt => {
        const text = opt.textContent?.toLowerCase() || '';
        (opt as HTMLElement).style.display = text.includes(q) ? 'flex' : 'none';
      });
    });

    sheetRoot.querySelectorAll('.md-store-option-card').forEach(opt => {
      opt.addEventListener('click', () => {
        const id = opt.getAttribute('data-id');
        if (id) {
          this.onStoreSelected(id);
          this.closeStoreSheet();
        }
      });
    });
  }
}
