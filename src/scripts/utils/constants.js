const cardListSelector = document.querySelector('.galery__cards');
const editProfileButton = document.querySelector('.profile__edit');
const popupAddCard = document.querySelector('.popup_cards_add-form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const galeryLoading = document.querySelector('.galery__card_loading');

const personAvatarForm = document.querySelector('.popup__form_edit_avatar');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const personAvatar = document.querySelector('.profile__image');
const personAvatarLoading = document.querySelector('.profile__image_loading');

const popupProfile = document.querySelector('.popup_profile_edit-form');
const popupFullSizeCard = document.querySelector('.galery_popup');
const popupDeleteCard = document.querySelector('.popup_card_delete');
const popupPersonAvatar = document.querySelector('.popup_change_avatar');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');
const popupAddNewCardButtonSubmit = popupAddCard.querySelector('.popup__submit-button');
const popupEditProfileButtonSubmit = popupProfile.querySelector('.popup__submit-button');
const popupAvatarChangeButtonSubmit = popupPersonAvatar.querySelector('.popup__submit-button');
const popupSubmitButton = document.querySelector('.popup__submit-button');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export { cardListSelector, popupProfile, editProfileButton, popupAddCard, 
  addNewCardButtonPopup, popupFullSizeCard, popupDeleteCard, popupSubmitButton, config, 
  personAvatarForm, personAvatar, popupPersonAvatar, popupPersonName, personName, 
  personDescription, popupPersonDescription, personAvatarLoading, galeryLoading, 
  popupAddNewCardButtonSubmit, popupEditProfileButtonSubmit, popupAvatarChangeButtonSubmit };