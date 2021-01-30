import { initialCards } from './initial_cards.js';
import { FormValidator, config } from './Formvalidator.js';
import { Card } from './Card.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';

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
//const popupEditProfileForm = new PopupWithForm(popupProfile);
//const popupAddCardForm = new PopupWithForm(popupAddCard);
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


const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    personName.textContent = popupPersonName.value;
    personDescription.textContent = popupPersonDescription.value;
    popupEditProfileForm.close();
  }
});
editProfileButton.addEventListener('click', () => {
  popupEditProfileForm.open();
  editProfileValidation.resetValidation();
});




const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    cardListSelector.prepend(createNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    }));
    popupAddNewCard.close();
  }
})

addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});




// function addNewCard(evt) {
//   evt.preventDefault();   
//   const newCard = {
//     name: inputCardText.value, 
//     link: inputCardImageLink.value
//   }
//   const cardElement = createCards(newCard, '.galery_card-tamplate');
//   cardListSelector.prepend(cardElement);
//   popupAddCardForm.close();
//   popupNewCardForm.reset();
// }

// function editPersonData(event) {
//   event.preventDefault();
//   personName.textContent = popupPersonName.value;
//   personDescription.textContent = popupPersonDescription.value;
//   popupEditProfileForm.close();
// }





// открывает попап для редактирования профиля и подставляет данные


// addNewCardButtonPopup.addEventListener('click', () => {
//   //popupNewCardForm.reset();
//   popupAddCardForm.open();
// //  openPopup(popupAddCard);
//   addNewCardValidation.resetValidation();
// });

//popupNewCardForm.addEventListener('submit', addNewCard);
