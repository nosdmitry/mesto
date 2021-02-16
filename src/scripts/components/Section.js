export class Section {
    constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(cardsArray, userData) {
    cardsArray.forEach((item) => {
      this._renderer(item, userData);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}