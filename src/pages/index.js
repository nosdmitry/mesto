import './index.css';

import { Section }            from '../scripts/components/Section.js';
import { Card }               from '../scripts/components/Card.js';
import { PopupWithImage }     from '../scripts/components/PopupWithImage.js';
import { PopupWithForm }      from '../scripts/components/PopupWithForm.js';
import { UserInfo }           from '../scripts/components/UserInfo.js';
import { FormValidator }      from '../scripts/components/Formvalidator.js';
import { Api }                from '../scripts/components/Api.js';

import { initialCards }       from '../scripts/utils/initialCards.js';
import { cardListSelector, popupProfile, editProfileButton, popupAddCard, addNewCardButtonPopup,
  popupFullSizeCard, config } from '../scripts/utils/constants.js';







const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
const popupWithImage = new PopupWithImage(popupFullSizeCard);
const user = new UserInfo({ 
  name: personName, 
  description: personDescription
});





const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f',
    "content-type": "aplication/json",
  }
});


api
  .getInitianCards()
  .then(data => {
    const cardList = new Section({
      data: data.map(item => {
        return {
          name: item.name,
          link: item.link
        }
      }),
      renderer: (cardItem) => {
        cardList.addItem(createNewCard(cardItem));
      }
    }, cardListSelector);
    cardList.renderItems();
  });




  





const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    cardList.addItem(createNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    }));
    popupAddNewCard.close();
  }
});

const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    user.setUserInfo(formData.popup_name, formData.popup_description);
    popupEditProfileForm.close();
  }
});

function createNewCard(cardItem) {
  const card = new Card(cardItem, '.galery_card-tamplate', popupWithImage.open);
  const cardElement = card.generateCard(card);
  return cardElement;
}

editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();
popupWithImage.setEventListener();
popupAddNewCard.setEventListener();
popupEditProfileForm.setEventListener();

editProfileButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  popupEditProfileForm.open();
  popupPersonName.value = userData.name;
  popupPersonDescription.value = userData.description;
  editProfileValidation.resetValidation();
});

addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});
