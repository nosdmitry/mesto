import { Popup } from "./Popup";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__submit-button_delete-confirm');
  }

  setEventListener(deleteCard) {
    super.setEventListener();
    this._deleteButton.addEventListener('click', () => {
      deleteCard();
      this.close();
    });
  }


}