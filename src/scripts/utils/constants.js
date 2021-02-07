const cardListSelector = document.querySelector('.galery__cards');
const popupProfile = document.querySelector('.popup_profile_edit-form');
const editProfileButton = document.querySelector('.profile__edit');

const popupAddCard = document.querySelector('.popup_cards_add-form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const popupFullSizeCard = document.querySelector('.galery_popup');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export { cardListSelector, popupProfile, editProfileButton, popupAddCard, 
  addNewCardButtonPopup, popupFullSizeCard, config };