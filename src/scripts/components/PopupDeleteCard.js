import { Popup } from "./Popup";

export class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteButton = document.querySelector('.popup__submit-button_delete-confirm');
  }

  deleteCard(cardId) {
    console.log('Удаляем карточку ' + cardId);
    console.log(this._deleteButton);
  }

  setEventListener(deleteCard) {
    super.setEventListener();
    this._deleteButton.addEventListener('click', () => {
      deleteCard();
      this.close();
    });
  }


}