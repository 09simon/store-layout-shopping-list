export type NavTabId = 'list' | 'shopping' | 'map';

export interface NavItemConfig {
  id: NavTabId;
  label: string;
  icon: string;
  badge?: string | number;
}

export class BottomNavBarComponent {
  private container: HTMLElement;
  private onSelectTab: (tabId: NavTabId) => void;

  constructor(container: HTMLElement, onSelectTab: (tabId: NavTabId) => void) {
    this.container = container;
    this.onSelectTab = onSelectTab;
  }

  render(activeTab: NavTabId, itemCount: number = 0, isTripActive: boolean = false): void {
    const navItems: NavItemConfig[] = [
      {
        id: 'list',
        label: 'Shopping List',
        icon: '📝',
        badge: itemCount > 0 ? itemCount : undefined
      },
      {
        id: 'shopping',
        label: 'Shopping Mode',
        icon: '🛍️',
        badge: isTripActive ? 'LIVE' : undefined
      },
      {
        id: 'map',
        label: 'Store Map',
        icon: '🗺️'
      }
    ];

    this.container.innerHTML = `
      <nav class="md-navigation-bar" role="navigation" aria-label="Main navigation">
        ${navItems.map(item => {
          const isActive = item.id === activeTab;
          return `
            <button 
              class="md-navigation-bar__item ${isActive ? 'md-navigation-bar__item--active' : ''}" 
              data-tab="${item.id}"
              aria-selected="${isActive ? 'true' : 'false'}"
              role="tab"
            >
              <div class="md-navigation-bar__icon-container">
                <div class="md-navigation-bar__indicator" aria-hidden="true"></div>
                <span class="md-navigation-bar__icon">${item.icon}</span>
                ${item.badge !== undefined ? `
                  <span class="md-navigation-bar__badge ${item.badge === 'LIVE' ? 'md-navigation-bar__badge--pulse' : ''}">
                    ${item.badge}
                  </span>
                ` : ''}
              </div>
              <span class="md-navigation-bar__label">${item.label}</span>
            </button>
          `;
        }).join('')}
      </nav>
    `;

    this.container.querySelectorAll('.md-navigation-bar__item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = (e.currentTarget as HTMLElement).getAttribute('data-tab') as NavTabId;
        if (target) {
          this.onSelectTab(target);
        }
      });
    });
  }
}
