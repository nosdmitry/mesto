/********************************************/
/*                                          */
/* This script works with popup window,     */
/* where you may change profile name and    */
/* description                              */
/*                                          */
/********************************************/

const popup = document.querySelector('.popup');
const popupProfileEdit = document.querySelector('.popup__profile_edit_form');
const profileEditButton = document.querySelector('.profile__edit');
const popupExitButton = popup.querySelector('.popup__exit-button');
//const popupExitOverlay = popup.querySelector('.popup__overlay');
const popupForm = popup.querySelector('.popup__form');
const formSubmitButton = popupForm.querySelector('.popup__submit-button');

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup__cards_add_form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const popupClosePopupButton = popupAddCard.querySelector('.popup__exit-button');

const galeryCards = document.querySelector('.galery__cards');
const galeryCardTamplate = document.querySelector('#galery__card').content;
//const popupAddNewCardForm = document.querySelector('.popup__form_add_new-card');

const addCard = document.querySelector('.popup__submit-button_add-card');

const initialCards = [
  {
    name: 'Озеро Байкал', 
    link: './images/galery/galery_baikal.jpg'
  },
  {
    name: 'Крымский полуостров', 
    link: './images/galery/galery_krimeria-semiisland.jpg'
  },
  {
    name: 'Балтийское море', 
    link: './images/galery/galery_dunes.jpg'
  },
  {
    name: 'Остров Гогланд', 
    link: './images/galery/galery_gogland.jpg'
  },
  {
    name: 'Рускеала',
    link: './images/galery/galery_ruskeala.jpg'
  },
  {
    name: 'Корякская Сопка',
    link: './images/galery/galery_volcano.jpg'
  }
];

function createCards__BUCKUP(card) {
  const cardContainer = document.createElement('article');
  const cardImg = document.createElement('img');
  const cardTitle = document.createElement('h2');
  const cardButtonLike = document.createElement('button');

  cardContainer.classList.add('galery__card');
  cardImg.classList.add('galery__img');
  cardTitle.classList.add('galery__text');
  cardButtonLike.classList.add('galery__heart');
  cardButtonLike.setAttribute('aria-label', 'Like');
  cardButtonLike.setAttribute('type', 'button');

  cardImg.setAttribute('src', card.link);
  cardImg.setAttribute('alt', card.name);
  cardTitle.textContent = card.name;
  cardContainer.append(cardImg, cardTitle, cardButtonLike);
  cardsContainer.append(cardContainer);
}

function renderGaleryCards() {
  const listItems = initialCards.map(formGaleryCard);
  galeryCards.append(...listItems);
}

function formGaleryCard(data) {
  const card = galeryCardTamplate.cloneNode(true);
  const cardImage = card.querySelector('.galery__img');
  const cardName = card.querySelector('.galery__text');
  const likeButton = card.querySelector('.galery__heart');
  const deleteButton = card.querySelector('.galery__delete-card-button');
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('title', data.name);
  cardImage.setAttribute('alt', data.name);
  cardName.textContent = data.name;  
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('galery__heart_active');
  });
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.galery__card').remove();
  });
  return card;
}

function addNewCard(evt) {
  evt.preventDefault();   
  const inputCardText = document.querySelector('.popup__input_type_card-name');
  const inputCardImageLink = document.querySelector('.popup__input_type_image-link'); 
  const newCard = formGaleryCard({
    name: inputCardText.value, 
    link: inputCardImageLink.value
  });
  galeryCards.prepend(newCard);
  console.log(inputCardText);
  closePopup();
  inputCardText.value = '';
  inputCardImageLink.value = '';
}

renderGaleryCards(initialCards);


function openPopup() {
  popup.classList.add('popup_opened');
  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
}

function closePopup() {
  const popups = document.querySelectorAll('.popup');
  for (let i = 0; i < popups.length; i++) {
    if (popups[i].classList.contains('popup_opened')){
      popups[i].classList.remove('popup_opened');
    }
  }
}

function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupPersonName.value;
  personDescription.textContent = popupPersonDescription.value;
  closePopup();
}

//  Closing popup with Esqape button
document.onkeydown = pressEsqape = (pressedKey) => {
  if (popup.classList.contains('popup_opened')){
    if (pressedKey.keyCode == 27) {
      closePopup();
    }
  }
};

addNewCardButtonPopup.addEventListener('click', openAddCardPopup);
popupClosePopupButton.addEventListener('click', closePopup);
addCard.addEventListener('click', addNewCard);
profileEditButton.addEventListener('click', openPopup);
popupExitButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editPersonData);