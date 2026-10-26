import { describe, it, expect } from 'vitest';
import { TopAppBarComponent } from '../../src/components/TopAppBar';
import { BottomNavBarComponent, NavTabId } from '../../src/components/BottomNavBar';

// Mock lightweight container for Node test environment
function createMockContainer() {
  const listeners: Record<string, Function[]> = {};
  const container = {
    innerHTML: '',
    querySelector(selector: string) {
      if (selector === '#theme-toggle-btn' || selector.includes('btn') || selector.includes('item')) {
        return {
          click: () => {
            if (listeners['click']) {
              listeners['click'].forEach(fn => fn({ currentTarget: { getAttribute: () => 'list' } }));
            }
          },
          addEventListener: (event: string, fn: Function) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
          },
          textContent: 'Mock Element',
          getAttribute: () => 'list'
        };
      }
      return null;
    },
    querySelectorAll(selector: string) {
      return [
        {
          getAttribute: (attr: string) => attr === 'data-tab' ? 'list' : null,
          addEventListener: (event: string, fn: Function) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(fn);
          }
        }
      ];
    }
  } as unknown as HTMLElement;

  return { container, listeners };
}

describe('Material 3 Stock Android Navigation & Theme Components', () => {
  it('renders TopAppBar with Material 3 structure and title', () => {
    let themeToggled = false;
    const { container } = createMockContainer();
    const topBar = new TopAppBarComponent(container, () => {
      themeToggled = true;
    });

    topBar.render('PathFinder Grocery', 'Tesco Szentpéteri kapu', 'dark');

    expect(container.innerHTML).toContain('md-top-app-bar');
    expect(container.innerHTML).toContain('PathFinder Grocery');
    expect(container.innerHTML).toContain('Tesco Szentpéteri kapu');
    expect(container.innerHTML).toContain('theme-toggle-btn');
    expect(container.innerHTML).toContain('☀️');
  });

  it('renders BottomNavBar with 3 stock Android destinations and active pill indicator', () => {
    let selectedTab: NavTabId | null = null;
    const { container } = createMockContainer();
    const bottomNav = new BottomNavBarComponent(container, (tabId) => {
      selectedTab = tabId;
    });

    bottomNav.render('shopping', 9, true);

    expect(container.innerHTML).toContain('md-navigation-bar');
    expect(container.innerHTML).toContain('md-navigation-bar__indicator');
    expect(container.innerHTML).toContain('Shopping List');
    expect(container.innerHTML).toContain('Shopping Mode');
    expect(container.innerHTML).toContain('Store Map');
    expect(container.innerHTML).toContain('md-navigation-bar__badge--pulse');
    expect(container.innerHTML).toContain('LIVE');
  });

  it('renders badges accurately in Bottom Navigation Bar', () => {
    const { container } = createMockContainer();
    const bottomNav = new BottomNavBarComponent(container, () => {});
    bottomNav.render('list', 5, false);

    expect(container.innerHTML).toContain('5');
    expect(container.innerHTML).toContain('md-navigation-bar__item--active');
  });
});
