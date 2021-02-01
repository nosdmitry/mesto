import './index.css';

import { Section }            from '../scripts/components/Section.js';
import { Card }               from '../scripts/components/Card.js';
import { PopupWithImage }     from '../scripts/components/PopupWithImage.js';
import { PopupWithForm }      from '../scripts/components/PopupWithForm.js';
import { UserInfo }           from '../scripts/components/UserInfo.js';
import { FormValidator }      from '../scripts/components/Formvalidator.js';

import { initialCards }       from '../scripts/utils/initial_cards.js';
import { cardListSelector, popupProfile, editProfileButton, personName, personDescription,
  popupPersonName, popupPersonDescription, popupAddCard, addNewCardButtonPopup,
  popupFullSizeCard, config } from '../scripts/utils/constants.js';




const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
const popupWithImage = new PopupWithImage(popupFullSizeCard);
const user = new UserInfo({ 
  name: personName, 
  description: personDescription
});


const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    cardList.addItem(createNewCard(cardItem));
  }
}, cardListSelector);

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

const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    console.log(formData);
    user.setUserInfo(formData.popup_name, formData.popup_description);
    console.log(user);
    popupEditProfileForm.close();
  }
});

function createNewCard(cardItem) {
  const card = new Card(cardItem, '.galery_card-tamplate', popupWithImage.open);
  const cardElement = card.generateCard(card);
  return cardElement;
}



cardList.renderItems();
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
