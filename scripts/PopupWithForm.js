import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  open() {
    //this._popupSelector.reset();
    this._popupSelector.classList.add('popup_opened');
    this.setEventListener();
  }

  _getInputValues() {
    // colects all form inputs    
  }

  setEventListener() {
    document.addEventListener('keydown', this._handleEscClose);

    this._popups.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
          this.close();
        }
        if(evt.target.classList.contains('popup__exit-button')) {
          this.close();
        }
      })
    });

    
  }

}