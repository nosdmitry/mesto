import { Popup } from "./Popup";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteCardForm = document.querySelector('.popup__form_delete_new-card');
    this._deleteCardConfirmButton = document.querySelector('.popup__submit-button_delete-confirm');
  }

  setEventListener(deleteCard) {
    super.setEventListener();
    this._deleteCardForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      deleteCard();
    });
  }


}