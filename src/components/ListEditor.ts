import { DEFAULT_CATEGORIES } from '../engine/defaultLayouts';

export class ListEditorComponent {
  private container: HTMLElement;
  private onAddItem: (title: string, categoryKey: string) => void;
  private onCreateList: (title: string) => void;
  private isSheetOpen: boolean = false;
  private selectedCategoryKey: string = '';

  constructor(
    container: HTMLElement,
    onAddItem: (title: string, categoryKey: string) => void,
    onCreateList: (title: string) => void
  ) {
    this.container = container;
    this.onAddItem = onAddItem;
    this.onCreateList = onCreateList;
  }

  render(activeListTitle?: string): void {
    if (!activeListTitle) {
      this.container.innerHTML = `
        <div class="md-card md-card--elevated list-create-card">
          <div class="md-card__header">
            <h2 class="md-typescale-title-large">📝 Create New Shopping List</h2>
            <p class="md-typescale-body-medium md-text-secondary">Start a new list sorted by your store's layout</p>
          </div>
          <form id="create-list-form" class="md-form-stack">
            <div class="md-text-field md-text-field--outlined">
              <input type="text" id="new-list-title" class="md-text-field__input" placeholder=" " required />
              <label for="new-list-title" class="md-text-field__label">Shopping List Title (e.g. Tesco Szentpéteri Kapu)</label>
            </div>
            <button type="submit" class="md-button md-button--filled md-button--large">
              <span class="md-button__icon">➕</span>
              <span class="md-button__label">Create Shopping List</span>
            </button>
          </form>
        </div>
      `;

      const form = this.container.querySelector('#create-list-form') as HTMLFormElement;
      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = this.container.querySelector('#new-list-title') as HTMLInputElement;
        if (input.value.trim()) {
          this.onCreateList(input.value.trim());
          input.value = '';
        }
      });
      return;
    }

    // When list is active, render FAB in fab-root or container and the modal bottom sheet
    const fabRoot = document.getElementById('fab-root');
    if (fabRoot) {
      fabRoot.innerHTML = `
        <button id="open-add-sheet-fab" class="md-fab md-fab--extended" aria-label="Add product item">
          <span class="md-fab__icon">➕</span>
          <span class="md-fab__label">Add Item</span>
        </button>
      `;

      const fab = fabRoot.querySelector('#open-add-sheet-fab');
      fab?.addEventListener('click', () => {
        this.openAddSheet(activeListTitle);
      });
    }

    // Modal Bottom Sheet container
    this.renderBottomSheet(activeListTitle);
  }

  private openAddSheet(activeListTitle: string): void {
    this.isSheetOpen = true;
    this.renderBottomSheet(activeListTitle);
    const titleInput = document.getElementById('item-title-input') as HTMLInputElement;
    setTimeout(() => titleInput?.focus(), 150);
  }

  private closeAddSheet(activeListTitle: string): void {
    this.isSheetOpen = false;
    this.selectedCategoryKey = '';
    this.renderBottomSheet(activeListTitle);
  }

  private renderBottomSheet(activeListTitle: string): void {
    const sheetRoot = document.getElementById('modal-sheet-root');
    if (!sheetRoot) return;

    if (!this.isSheetOpen) {
      sheetRoot.innerHTML = '';
      return;
    }

    sheetRoot.innerHTML = `
      <div class="md-scrim" id="modal-scrim"></div>
      <div class="md-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <div class="md-bottom-sheet__drag-handle"></div>
        <div class="md-bottom-sheet__header">
          <div class="md-bottom-sheet__headline">
            <h3 id="sheet-title" class="md-typescale-title-large">Add Product</h3>
            <p class="md-typescale-body-small md-text-secondary">${activeListTitle}</p>
          </div>
          <button id="close-sheet-btn" class="md-icon-button" aria-label="Close sheet">✕</button>
        </div>

        <form id="add-item-modal-form" class="md-bottom-sheet__content">
          <div class="md-text-field md-text-field--outlined">
            <input 
              type="text" 
              id="item-title-input" 
              class="md-text-field__input" 
              placeholder=" " 
              autocomplete="off"
              required 
            />
            <label for="item-title-input" class="md-text-field__label">Product Name (e.g. Nectarines, Bulgur...)</label>
          </div>

          <div class="md-chips-section">
            <span class="md-typescale-label-medium md-text-secondary">Select Department / Category:</span>
            <div class="md-chip-group">
              <button 
                type="button" 
                class="md-chip md-chip--filter ${this.selectedCategoryKey === '' ? 'md-chip--selected' : ''}" 
                data-cat=""
              >
                <span class="md-chip__icon">✨</span>
                <span class="md-chip__label">Auto-Detect</span>
              </button>
              ${DEFAULT_CATEGORIES.map(cat => `
                <button 
                  type="button" 
                  class="md-chip md-chip--filter ${this.selectedCategoryKey === cat.key ? 'md-chip--selected' : ''}" 
                  data-cat="${cat.key}"
                >
                  <span class="md-chip__icon">${cat.icon}</span>
                  <span class="md-chip__label">${cat.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="md-bottom-sheet__actions">
            <button type="button" id="cancel-sheet-btn" class="md-button md-button--text">Cancel</button>
            <button type="submit" class="md-button md-button--filled">
              <span class="md-button__icon">✓</span>
              <span class="md-button__label">Add to List</span>
            </button>
          </div>
        </form>
      </div>
    `;

    sheetRoot.querySelector('#modal-scrim')?.addEventListener('click', () => this.closeAddSheet(activeListTitle));
    sheetRoot.querySelector('#close-sheet-btn')?.addEventListener('click', () => this.closeAddSheet(activeListTitle));
    sheetRoot.querySelector('#cancel-sheet-btn')?.addEventListener('click', () => this.closeAddSheet(activeListTitle));

    sheetRoot.querySelectorAll('.md-chip--filter').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const catKey = (e.currentTarget as HTMLElement).getAttribute('data-cat') || '';
        this.selectedCategoryKey = catKey;
        sheetRoot.querySelectorAll('.md-chip--filter').forEach(c => c.classList.remove('md-chip--selected'));
        (e.currentTarget as HTMLElement).classList.add('md-chip--selected');
      });
    });

    const form = sheetRoot.querySelector('#add-item-modal-form') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = sheetRoot.querySelector('#item-title-input') as HTMLInputElement;
      if (titleInput.value.trim()) {
        this.onAddItem(titleInput.value.trim(), this.selectedCategoryKey);
        titleInput.value = '';
        this.closeAddSheet(activeListTitle);
      }
    });
  }
}
