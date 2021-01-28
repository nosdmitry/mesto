export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._esqkey = this._handleEscClose;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListener();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._esqkey);
  }

  _handleEscClose = (event) => {
    if(event.code == 'Escape') {
      this.close();
    }
  }

  setEventListener() {
    document.addEventListener('keydown', this._handleEscClose);
  }
}