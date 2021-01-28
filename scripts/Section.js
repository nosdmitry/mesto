export class Section {
  constructor({ items, renderer }, container) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems() {
    
  }

  addItem(element) {
    this._container.append(element);
  }
}