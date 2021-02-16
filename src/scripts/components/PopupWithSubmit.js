import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteCardForm = document.querySelector('.popup__form_delete_new-card');
    this._deleteCardConfirmButton = document.querySelector('.popup__submit-button_delete-confirm');
    this._deleteMethod;
  }

  open = (deleteMethod) => {
    super.open();
    this._deleteMethod = deleteMethod;
  }

  changeButtonContent() {
    this._deleteCardConfirmButton.textContent = 'Удаление...';
  }

  close() {
    super.close();
    setTimeout((() => this._deleteCardConfirmButton.textContent = 'Да'), 500);
  }

  setEventListener() {
    super.setEventListener();
    this._deleteCardForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteMethod();
    });
  }
}