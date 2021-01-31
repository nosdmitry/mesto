import { initialCards } from './initial_cards.js';
import { FormValidator, config } from './Formvalidator.js';
import { Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';
import { cardListSelector, popupProfile, editProfileButton, personName, personDescription,
   popupPersonName, popupPersonDescription, popupAddCard, addNewCardButtonPopup,
   popupFullSizeCard } from './utils.js';


const popupWithImage = new PopupWithImage(popupFullSizeCard);
const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');



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
    const user = new UserInfo( { name: formData.popup_name, description: formData.popup_description });
    user.setUserInfo();  
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
  popupEditProfileForm.open();
  const user = new UserInfo( { name: personName.textContent, description: personDescription.textContent } );
  const userData = user.getUserInfo();
  popupPersonName.value = userData.name;
  popupPersonDescription.value = userData.description;
  editProfileValidation.resetValidation();
});

addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});
