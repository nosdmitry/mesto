import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._submitButton = this._popupSelector.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputsValue = {}
    this._inputList.forEach(input => this._inputsValue[input.name] = input.value);
    return this._inputsValue;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  } 
}