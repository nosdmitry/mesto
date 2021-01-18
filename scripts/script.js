import { initialCards } from './initial_cards.js';
import { FormValidator, config } from './Formvalidator.js';
import { Card } from './Card.js';

const galeryCards = document.querySelector('.galery__cards');

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
const popupFullSizeImage = popupFullSizeCard.querySelector('.galery__fulsize-img');
const popupFullSizeImageText = popupFullSizeCard.querySelector('.galery__popup-text');

const inputCardText = document.querySelector('.popup__input_type_card-name');
const inputCardImageLink = document.querySelector('.popup__input_type_image-link'); 

const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');

// ссылка на функцию для обработки слушателя 
// закрытия попапа
const escapeKey = handlerEsqKey;

function createCards(cardData, cardTemplateSelector) {
  const card = new Card(cardData, cardTemplateSelector, openFullScreenImage);
  const cardElement = card.generateCard(card);
  return cardElement;
}

function addNewCard(evt) {
  evt.preventDefault();   
  const newCard = {
    name: inputCardText.value, 
    link: inputCardImageLink.value
  }
  const cardElement = createCards(newCard, '.galery_card-tamplate');
  galeryCards.prepend(cardElement);
  closePopup(popupAddCard);
  popupNewCardForm.reset();
}

function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupPersonName.value;
  personDescription.textContent = popupPersonDescription.value;
  closePopup(popupProfile);
}

// обработчик события нажития на Esc
function handlerEsqKey(event) {
  if(event.code == 'Escape') {
    const result = document.querySelector('.popup_opened');
    return closePopup(result);
  }
}

function openFullScreenImage(imageName, imageLink) {
  popupFullSizeImage.setAttribute('src', imageLink);
  popupFullSizeImage.setAttribute('alt', imageName);
  popupFullSizeImageText.textContent = imageName;  
  openPopup(popupFullSizeCard);
};

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', escapeKey);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKey);
}




editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();

initialCards.forEach((element) => {
  const cardElement = createCards(element, '.galery_card-tamplate');  
  galeryCards.append(cardElement);
});

// открывает попап для редактирования профиля и подставляет данные
editProfileButton.addEventListener('click', () => {
  popupProfileEditForm.reset();
  openPopup(popupProfile);
  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
  editProfileValidation.resetValidation();
});

addNewCardButtonPopup.addEventListener('click', () => {
  popupNewCardForm.reset();
  openPopup(popupAddCard);
  addNewCardValidation.resetValidation();
});

// закрытие всех попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if(evt.target.classList.contains('popup__exit-button')) {
      closePopup(popup);
    }
  })
});

popupProfileEditForm.addEventListener('submit', editPersonData);
popupNewCardForm.addEventListener('submit', addNewCard);
