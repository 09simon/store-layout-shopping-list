import { storeRepository } from './repository/storeRepository';
import { storeDirectoryService } from './repository/storeDirectory';
import { sequenceLoggerService } from './repository/sequenceLogger';
import { communitySyncService } from './repository/communitySync';
import { sortListItemsForStore } from './engine/routeSorter';
import { ShoppingList, Store } from './models/types';
import { ListEditorComponent } from './components/ListEditor';
import { ListViewComponent } from './components/ListView';
import { StoreSelectorComponent } from './components/StoreSelector';
import { ShoppingModeComponent } from './components/ShoppingMode';
import { LayoutViewerComponent } from './components/LayoutViewer';
import { TopAppBarComponent } from './components/TopAppBar';
import { BottomNavBarComponent, NavTabId } from './components/BottomNavBar';

export class AppController {
  private activeList: ShoppingList | null = null;
  private activeStore: Store | null = null;
  private stores: Store[] = [];
  private activeTab: NavTabId = 'list';
  private currentTheme: 'light' | 'dark' = 'dark';
  private isShoppingTripActive: boolean = false;

  private topAppBar!: TopAppBarComponent;
  private bottomNavBar!: BottomNavBarComponent;
  private listEditor!: ListEditorComponent;
  private listView!: ListViewComponent;
  private storeSelector!: StoreSelectorComponent;
  private shoppingMode!: ShoppingModeComponent;
  private layoutViewer!: LayoutViewerComponent;

  async init(): Promise<void> {
    this.initTheme();

    // 1. Initialize stores and local data
    this.stores = await storeDirectoryService.getAllStores();
    let lists = await storeRepository.getLists();

    if (lists.length === 0) {
      // Create initial list with default Tesco items
      this.activeList = await storeRepository.createList('Tesco Supermarket Run', 'tesco-miskolc-szentpeteri');
      await storeRepository.addListItem(this.activeList.id, 'Nectarines');
      await storeRepository.addListItem(this.activeList.id, 'Organic rice drink');
      await storeRepository.addListItem(this.activeList.id, 'Whole wheat crescent roll');
      await storeRepository.addListItem(this.activeList.id, 'Pick winter salami');
      await storeRepository.addListItem(this.activeList.id, 'Fine flour');
      await storeRepository.addListItem(this.activeList.id, 'Bulgur');
      await storeRepository.addListItem(this.activeList.id, 'Toilet paper');
      await storeRepository.addListItem(this.activeList.id, 'Rat poison');
      await storeRepository.addListItem(this.activeList.id, 'Toothpaste');
    } else {
      this.activeList = lists[0];
    }

    if (this.activeList.storeId) {
      this.activeStore = await storeDirectoryService.getStoreById(this.activeList.storeId);
    } else {
      const tesco = this.stores.find(s => s.id === 'tesco-miskolc-szentpeteri');
      if (tesco) {
        this.activeStore = tesco;
        await storeRepository.setListStore(this.activeList.id, tesco.id);
      }
    }

    this.bindDOM();
    await this.refreshUI();
  }

  private initTheme(): void {
    const savedTheme = localStorage.getItem('pfg_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.currentTheme = 'light';
    } else {
      this.currentTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  private toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pfg_theme', this.currentTheme);
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.topAppBar.render('PathFinder Grocery', this.activeStore?.name, this.currentTheme);
  }

  private bindDOM(): void {
    const topBarRoot = document.getElementById('top-app-bar-root')!;
    const bottomNavRoot = document.getElementById('bottom-nav-root')!;
    const editorRoot = document.getElementById('editor-root')!;
    const listViewRoot = document.getElementById('list-view-root')!;
    const storeSelectorRoot = document.getElementById('store-selector-root')!;
    const shoppingModeRoot = document.getElementById('shopping-mode-root')!;
    const layoutViewerRoot = document.getElementById('layout-viewer-root')!;

    // Top and Bottom App Bars
    this.topAppBar = new TopAppBarComponent(topBarRoot, () => this.toggleTheme());
    this.bottomNavBar = new BottomNavBarComponent(bottomNavRoot, (tabId) => this.switchTab(tabId));

    // Content Components
    this.storeSelector = new StoreSelectorComponent(storeSelectorRoot, async (storeId) => {
      if (this.activeList) {
        await storeRepository.setListStore(this.activeList.id, storeId);
        this.activeStore = await storeDirectoryService.getStoreById(storeId);
        await this.refreshUI();
      }
    });

    this.listEditor = new ListEditorComponent(
      editorRoot,
      async (title, catKey) => {
        if (this.activeList) {
          await storeRepository.addListItem(this.activeList.id, title, catKey || undefined);
          await this.refreshUI();
        }
      },
      async (title) => {
        this.activeList = await storeRepository.createList(title, this.activeStore?.id);
        await this.refreshUI();
      }
    );

    this.listView = new ListViewComponent(
      listViewRoot,
      async (itemId) => {
        await storeRepository.toggleListItem(itemId);
        await this.refreshUI();
      },
      async (itemId) => {
        await storeRepository.deleteListItem(itemId);
        await this.refreshUI();
      }
    );

    this.shoppingMode = new ShoppingModeComponent(
      shoppingModeRoot,
      async (itemId) => {
        const item = await storeRepository.toggleListItem(itemId);
        if (item && item.isCollected) {
          sequenceLoggerService.recordPick(item);
        }
        await this.refreshUI();
      },
      async () => {
        if (this.activeStore && this.activeList) {
          await sequenceLoggerService.finishShoppingTrip(this.activeStore.id);
          await communitySyncService.processStoreLogs(this.activeStore.id);
          await storeRepository.setListStatus(this.activeList.id, 'COMPLETED');
          this.stores = await storeDirectoryService.getAllStores();
          this.isShoppingTripActive = false;
          this.activeTab = 'list';
          await this.refreshUI();
        }
      }
    );

    this.layoutViewer = new LayoutViewerComponent(layoutViewerRoot);
  }

  public switchTab(tab: NavTabId): void {
    this.activeTab = tab;
    if (tab === 'shopping') {
      if (!this.isShoppingTripActive) {
        sequenceLoggerService.startShoppingTrip();
        this.isShoppingTripActive = true;
      }
    }

    const editorRoot = document.getElementById('editor-root')!;
    const listViewRoot = document.getElementById('list-view-root')!;
    const storeSelectorRoot = document.getElementById('store-selector-root')!;
    const shoppingModeRoot = document.getElementById('shopping-mode-root')!;
    const layoutViewerRoot = document.getElementById('layout-viewer-root')!;
    const fabRoot = document.getElementById('fab-root');

    editorRoot.style.display = tab === 'list' ? 'block' : 'none';
    listViewRoot.style.display = tab === 'list' ? 'block' : 'none';
    storeSelectorRoot.style.display = tab !== 'map' ? 'block' : 'none';
    shoppingModeRoot.style.display = tab === 'shopping' ? 'block' : 'none';
    layoutViewerRoot.style.display = tab === 'map' ? 'block' : 'none';

    if (fabRoot) {
      fabRoot.style.display = tab === 'list' ? 'block' : 'none';
    }

    this.refreshUI();
  }

  public async refreshUI(): Promise<void> {
    if (this.activeList) {
      const refreshedList = await storeRepository.getListById(this.activeList.id);
      if (refreshedList) {
        this.activeList = refreshedList;
        if (this.activeList.items) {
          this.activeList.items = await sortListItemsForStore(this.activeList.items, this.activeStore?.id);
        }
      }
    }

    const itemCount = this.activeList?.items?.length || 0;
    this.topAppBar.render('PathFinder Grocery', this.activeStore?.name, this.currentTheme);
    this.bottomNavBar.render(this.activeTab, itemCount, this.isShoppingTripActive);
    this.storeSelector.render(this.stores, this.activeStore?.id);

    if (this.activeTab === 'list') {
      this.listEditor.render(this.activeList?.title);
      this.listView.render(this.activeList?.items || [], this.activeStore?.name);
    } else if (this.activeTab === 'shopping') {
      this.shoppingMode.render(this.activeList?.items || [], this.activeStore);
    } else if (this.activeTab === 'map') {
      await this.layoutViewer.render(this.activeStore);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
