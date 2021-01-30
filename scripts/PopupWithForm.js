import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  // open() {
  //   super.open();
  //   console.log('Popup With form opened')
  // }

  _getInputValues() {
    // colects all form inputs    
  }
}