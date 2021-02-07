export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose = (event) => {
    if(event.code === 'Escape') {
      this.close();
    }
  }
  
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListener() {
    this._popupSelector.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened') || 
      evt.target.classList.contains('popup__exit-button')) {
        this.close();
      }
    });
  }
}