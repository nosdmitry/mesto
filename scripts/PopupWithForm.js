import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._submitButton = this._popupSelector.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    // colects all form inputs    
  }

}