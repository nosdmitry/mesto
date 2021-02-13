import './index.css';

import { Section }            from '../scripts/components/Section.js';
import { Card }               from '../scripts/components/Card.js';
import { PopupWithImage }     from '../scripts/components/PopupWithImage.js';
import { PopupWithForm }      from '../scripts/components/PopupWithForm.js';
import { UserInfo }           from '../scripts/components/UserInfo.js';
import { FormValidator }      from '../scripts/components/Formvalidator.js';
import { Api }                from '../scripts/components/Api';

import { cardListSelector, popupProfile, editProfileButton, popupAddCard, addNewCardButtonPopup,
  popupFullSizeCard, config } from '../scripts/utils/constants.js';







const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const personAvatar = document.querySelector('.profile__image');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
const popupWithImage = new PopupWithImage(popupFullSizeCard);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f'
  }
});


const cardList = new Section({
  renderer: (cardItem) => {
    cardList.addItem(createNewCard(cardItem));
  }
}, cardListSelector);

api.getAllCards()
  .then(res => {
    cardList.renderItems(res);
  })
  .catch(err => console.log(err))




api.getUserInfo()
  .then(userData => {
    personName.textContent = userData.name;
    personDescription.textContent = userData.about;
    personAvatar.src = userData.avatar;
    return { name: userData.name, description: userData.about }
  })
  .catch(err => console.log(err));

  const user = new UserInfo({ 
    name: personName, 
    description: personDescription
  });


const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    api.editUserInfo({
      name: formData.popup_name,
      about: formData.popup_description
    })
    .then(data => {
      user.setUserInfo(data.name, data.about);
    })
    .catch(err => console.log(err));

    popupEditProfileForm.close();
  }
});





editProfileButton.addEventListener('click', () => {

  const userData = user.getUserInfo();
  popupEditProfileForm.open();

  popupPersonName.value = userData.name;
  popupPersonDescription.value = userData.description;
  editProfileValidation.resetValidation();
});


const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    api.addNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    })
    .then(data => cardList.addItem(createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes
    })))
    .catch(err => console.log(err));
    popupAddNewCard.close();
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


addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});
