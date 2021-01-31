import { initialCards } from './initial_cards.js';
import { FormValidator, config } from './Formvalidator.js';
import { Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

const cardListSelector = document.querySelector('.galery__cards');
const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('.popup_profile_edit-form');
const editProfileButton = document.querySelector('.profile__edit');
const popupProfileEditForm = popupProfile.querySelector('.popup__form');
const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_cards_add-form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const popupNewCardForm = document.querySelector('.popup__form_add_new-card');

const popupFullSizeCard = document.querySelector('.galery_popup');

const inputCardText = document.querySelector('.popup__input_type_card-name');
const inputCardImageLink = document.querySelector('.popup__input_type_image-link'); 




const popupWithImage = new PopupWithImage(popupFullSizeCard);
popupWithImage.setEventListener();
const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');

editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();



function createNewCard(cardItem) {
  const card = new Card(cardItem, '.galery_card-tamplate', popupWithImage.open);
  const cardElement = card.generateCard(card);
  return cardElement;
}


const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    cardList.addItem(createNewCard(cardItem));
  }
}, cardListSelector);

cardList.renderItems();


const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    cardListSelector.prepend(createNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    }));
    console.log('Add new card');
    popupAddNewCard.close();
  }
});
popupAddNewCard.setEventListener();




const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    console.log(formData);
    const user = new UserInfo( { name: formData.popup_name, description: formData.popup_description });
    user.setUserInfo();  

    popupEditProfileForm.close();
  }
});
popupEditProfileForm.setEventListener();

editProfileButton.addEventListener('click', () => {
  popupEditProfileForm.open();
  const user = new UserInfo( { name: personName.textContent, description: personDescription.textContent } );
  const userData = user.getUserInfo();
  console.log(userData);
  popupPersonName.value = userData.name;
  popupPersonDescription.value = userData.description;
  editProfileValidation.resetValidation();
});

addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});
