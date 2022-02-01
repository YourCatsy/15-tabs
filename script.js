class Tabs {
  #tabsEl;

  static CLASS_ITEM = 'tab-item';
  static CLASS_HEADER = 'tab-item-header';
  static CLASS_CONTENT = 'tab-item-content';
  static CLASS_OPEN = 'open';
  static CLASS_HEADER_ACTIVE = 'header-active';

  constructor(tabsEl) {
    this.#tabsEl = tabsEl;

    this.setStyles();
    this.setEvents();
    this.selectFirst();
  }

  selectFirst() {
    document.querySelector('.' + Tabs.CLASS_HEADER).click();
  }

  setStyles() {
    for (let itemEl of this.#tabsEl.children) {
      itemEl.classList.add(Tabs.CLASS_ITEM);
      const [headerEl, contentEl] = itemEl.children;
      headerEl.classList.add(Tabs.CLASS_HEADER);
      contentEl.classList.add(Tabs.CLASS_CONTENT);
    }
  }

  setEvents() {
    this.#tabsEl.addEventListener('click', (e) => this.onRootElementClick(e));
  }

  onRootElementClick(e) {
    if (e.target.classList.contains(Tabs.CLASS_HEADER)) {
      const headerEl = e.target;
      const contentEl = this.getContentEl(headerEl);
      const openContentEl = this.findOpenContentEl();

      document.querySelectorAll('.' + Tabs.CLASS_HEADER_ACTIVE).forEach((header) => {
        header.classList.remove(Tabs.CLASS_HEADER_ACTIVE);
      });
      headerEl.classList.add(Tabs.CLASS_HEADER_ACTIVE);

      if (openContentEl) {
        this.toggleContent(openContentEl);
      }
      this.toggleContent(contentEl);
    }
  }

  getContentEl(el) {
    const itemEl = el.closest('.' + Tabs.CLASS_ITEM);
    return itemEl.querySelector('.' + Tabs.CLASS_CONTENT);
  }

  findOpenContentEl() {
    return this.#tabsEl.querySelector('.' + Tabs.CLASS_OPEN);
  }
  toggleContent(contentEl) {
    contentEl.classList.toggle(Tabs.CLASS_OPEN);
  }
}

const tabsEl = document.querySelector('#tabs');
new Tabs(tabsEl);

export default Tabs;


