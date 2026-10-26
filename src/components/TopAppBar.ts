export interface TopAppBarAction {
  id: string;
  icon: string;
  title: string;
  badge?: string;
  onClick: () => void;
}

export class TopAppBarComponent {
  private container: HTMLElement;
  private onThemeToggle: () => void;

  constructor(container: HTMLElement, onThemeToggle: () => void) {
    this.container = container;
    this.onThemeToggle = onThemeToggle;
  }

  render(title: string, subtitle?: string, activeTheme: 'light' | 'dark' = 'dark'): void {
    const themeIcon = activeTheme === 'dark' ? '☀️' : '🌙';
    const themeTitle = activeTheme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme';

    this.container.innerHTML = `
      <header class="md-top-app-bar" role="banner">
        <div class="md-top-app-bar__leading">
          <div class="md-top-app-bar__brand-icon">🛒</div>
        </div>
        
        <div class="md-top-app-bar__headline">
          <h1 class="md-top-app-bar__title">${title}</h1>
          ${subtitle ? `<p class="md-top-app-bar__subtitle">${subtitle}</p>` : ''}
        </div>

        <div class="md-top-app-bar__trailing">
          <button id="theme-toggle-btn" class="md-icon-button" title="${themeTitle}" aria-label="${themeTitle}">
            <span class="md-icon-button__icon">${themeIcon}</span>
          </button>
        </div>
      </header>
    `;

    const themeBtn = this.container.querySelector('#theme-toggle-btn');
    themeBtn?.addEventListener('click', () => {
      this.onThemeToggle();
    });
  }
}
