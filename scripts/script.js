import { initialCards } from './initial_cards.js';
import { FormValidator, config } from './formvalidator.js';
import { Card } from './card.js';

const popupProfile = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit');
const popupProfileEditForm = popupProfile.querySelector('.popup__form');
const exitProfilePopupButton = popupProfile.querySelector('.exit_button_profile-popup');

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_cards_add-form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const exitAddCardPopupButton = popupAddCard.querySelector('.popup__exit-button');

const galeryCards = document.querySelector('.galery__cards');
const galeryCardTamplate = document.querySelector('.galery_card-tamplate').content;
const popupNewCardForm = document.querySelector('.popup__form_add_new-card');

const addCard = document.querySelector('.popup__submit-button_add-card');

const popupFullSizeCard = document.querySelector('.galery_popup');
const exitFullScreenImagePopup = popupFullSizeCard.querySelector('.galery__popup-exit');



const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
editProfileValidation.enableValidation();

const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
addNewCardValidation.enableValidation();


// закрытие попапа при нажатии на тёмную область
const handlePopupOverlayClick = (popupName) => {
  popupName.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
      closePopup(popupName);
    }
});
};

// обработчик собатия нажития на Esc
const handlerEsqKey = (event) => {
  if(event.code == 'Escape') {
    const result = document.querySelector('.popup_opened');
    return closePopup(result);
  }
}

const escapeKey = handlerEsqKey;

function openFullScreenImage(name, link) {
  const popupFullSizeImage = document.querySelector('.galery__fulsize-img');
  const popupFullSizeImageText = document.querySelector('.galery__popup-text');
  popupFullSizeImage.setAttribute('src', link);
  popupFullSizeImage.setAttribute('alt', name);
  popupFullSizeImageText.textContent = name;  
  openPopup(popupFullSizeCard);
};

function renderCards(cardData, cardStyleClass) {
  const card = new Card(cardData, cardStyleClass, openFullScreenImage);
  const cardElement = card.generateCard(card);
  return cardElement;
}

initialCards.forEach((element) => {
  const cardElement = renderCards(element, '.galery_card-tamplate');  
  galeryCards.append(cardElement);
});


function addNewCard(evt) {
  evt.preventDefault();   
  const inputCardText = document.querySelector('.popup__input_type_card-name');
  const inputCardImageLink = document.querySelector('.popup__input_type_image-link'); 
  const newCard = {
    name: inputCardText.value, 
    link: inputCardImageLink.value
  }
  const cardElement = renderCards(newCard, '.galery_card-tamplate');
  galeryCards.prepend(cardElement);
  closePopup(popupAddCard);
  clearEveryFormInputs();
}

// очищает все формы
function clearEveryFormInputs() {
  const forms = document.getElementsByClassName('popup__form');
  [...forms].forEach(element => {
    element.reset();
  });
}









function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupPersonName.value;
  personDescription.textContent = popupPersonDescription.value;
  closePopup(popupProfile);
}



// ссылка на функцию для обработки слушателя 
// закрытия попапа

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  handlePopupOverlayClick(popupName);
  document.addEventListener('keydown', escapeKey);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKey);
}

// открывает попап для редактирования профиля и подставляет данные
editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  clearEveryFormInputs();
  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
  editProfileValidation.resetValidation();
});

exitProfilePopupButton.addEventListener('click', () => {  
  closePopup(popupProfile);
});

addNewCardButtonPopup.addEventListener('click', () => {
  clearEveryFormInputs();  
  openPopup(popupAddCard);
  addNewCardValidation.resetValidation();
});

exitAddCardPopupButton.addEventListener('click', () => {
  hideAllInputsErrors(config);
  closePopup(popupAddCard);
});

exitFullScreenImagePopup.addEventListener('click', () => {
  closePopup(popupFullSizeCard);
});

popupProfileEditForm.addEventListener('submit', editPersonData);
popupNewCardForm.addEventListener('submit', addNewCard);
