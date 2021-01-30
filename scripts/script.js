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

const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');

const popupEditProfileForm = new PopupWithForm(popupProfile);
const popupAddCardForm = new PopupWithForm(popupAddCard);



const cardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '.galery_card-tamplate', popupWithImage.open);
    const cardElement = card.generateCard(card);
    cardList.addItem(cardElement);
  }
}, cardListSelector);
console.log(initialCards);

cardList.renderItems();








// function createCards(cardData) {
//   const card = new Card(cardData, '.galery_card-tamplate', popupWithImage.open);
//   const cardElement = card.generateCard(card);
//   return cardElement;
// }



function addNewCard(evt) {
  evt.preventDefault();   
  const newCard = {
    name: inputCardText.value, 
    link: inputCardImageLink.value
  }
  const cardElement = createCards(newCard, '.galery_card-tamplate');
  cardListSelector.prepend(cardElement);
  popupAddCardForm.close();
  popupNewCardForm.reset();
}

function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupPersonName.value;
  personDescription.textContent = popupPersonDescription.value;
  popupEditProfileForm.close();
}

editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();

// initialCards.forEach((element) => {
//   const cardElement = createCards(element);  
//   cardListSelector.append(cardElement);
// });

// открывает попап для редактирования профиля и подставляет данные
editProfileButton.addEventListener('click', () => {
  //popupProfileEditForm.reset();
  popupEditProfileForm.open();

  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
  editProfileValidation.resetValidation();
});

addNewCardButtonPopup.addEventListener('click', () => {
  //popupNewCardForm.reset();
  popupAddCardForm.open();
//  openPopup(popupAddCard);
  addNewCardValidation.resetValidation();
});

popupProfileEditForm.addEventListener('submit', editPersonData);
popupNewCardForm.addEventListener('submit', addNewCard);
