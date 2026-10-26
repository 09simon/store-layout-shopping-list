import { Store } from '../models/types';
import { getStoreSectionSequence } from '../engine/routeSorter';
import { CATEGORY_MAP } from '../engine/defaultLayouts';

export class LayoutViewerComponent {
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  async render(store?: Store | null): Promise<void> {
    const storeId = store ? store.id : undefined;
    const sequence = await getStoreSectionSequence(storeId);

    this.container.innerHTML = `
      <div class="md-card md-card--elevated md-map-viewer-card">
        <div class="md-map-viewer-card__header">
          <div class="md-map-viewer-card__title-box">
            <h3 class="md-typescale-title-large">🗺️ Store Physical Layout Map</h3>
            <p class="md-typescale-body-small md-text-secondary">
              ${store ? `Derived route for ${store.name}` : 'Default Department Walking Sequence'}
            </p>
          </div>
          ${store?.hasCustomMap 
            ? `<span class="md-badge md-badge--success">👥 Community Map Active</span>` 
            : `<span class="md-badge md-badge--neutral">📦 Template Fallback</span>`}
        </div>

        <div class="md-timeline-stepper">
          ${sequence.map((catKey, index) => {
            const cat = CATEGORY_MAP.get(catKey);
            const icon = cat ? cat.icon : '📦';
            const name = cat ? cat.name : catKey;

            return `
              <div class="md-timeline-step">
                <div class="md-timeline-step__indicator">
                  <div class="md-timeline-step__badge">${index + 1}</div>
                  ${index < sequence.length - 1 ? `<div class="md-timeline-step__line"></div>` : ''}
                </div>
                <div class="md-card md-card--tonal md-timeline-step__card">
                  <span class="md-timeline-step__icon">${icon}</span>
                  <div class="md-timeline-step__content">
                    <span class="md-typescale-title-small">${name}</span>
                    <span class="md-typescale-body-small md-text-secondary">Department Code: ${catKey}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}
