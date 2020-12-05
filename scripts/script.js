/********************************************/
/*                                          */
/* This script works with popup window,     */
/* where you may change profile name and    */
/* description                              */
/*                                          */
/********************************************/

const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_profile_edit_form')
const popupProfileEdit = document.querySelector('.popup__profile_edit_form');
const profileEditButton = document.querySelector('.profile__edit');
const popupExitButton = popup.querySelector('.popup__exit-button');
const popupForm = popup.querySelector('.popup__form');
const formSubmitButton = popupForm.querySelector('.popup__submit-button');

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupPersonName = document.querySelector('.popup__input_type_name');
const popupPersonDescription = document.querySelector('.popup__input_type_description');

const popupAddCard = document.querySelector('.popup_cards_add_form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const popupClosePopupButton = popupAddCard.querySelector('.popup__exit-button');

const galeryCards = document.querySelector('.galery__cards');
const galeryCardTamplate = document.querySelector('.galery__card-tamplate').content;
const popupNewCardForm = document.querySelector('.popup__form_add_new-card');

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

function renderGaleryCards() {
  const listItems = initialCards.map(formGaleryCard);
  galeryCards.append(...listItems);
}

function openFullSizeImg(evt) {
  evt.target.closest('galery__popup').classList.add('HELLLLLOOOOOOO!!!!');
}

function formGaleryCard(data) {
  const card = galeryCardTamplate.cloneNode(true);
  const cardImage = card.querySelector('.galery__img');
  const cardName = card.querySelector('.galery__text');
  const likeButton = card.querySelector('.galery__heart');
  const deleteButton = card.querySelector('.galery__delete-card-button');
  const cardPopup = card.querySelector('.galery__popup');  
  const fullScreenImg = card.querySelector('.galery__fulsize-img');
  const fullScreenImgText = card.querySelector('.galery__popup-text');

  const galeryPopupExitButton = card.querySelector('.galery__popup-exit');

  galeryPopupExitButton.addEventListener('click', () => {
    cardPopup.classList.remove('popup_opened');
  });

  fullScreenImg.setAttribute('src', data.link);
  fullScreenImgText.textContent = data.name;
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('title', data.name);
  cardImage.setAttribute('alt', data.name);
  cardImage.addEventListener('click', () => {
    cardPopup.classList.add('popup_opened');
  });
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

const popups = document.querySelectorAll('.popup');
function closePopup() {
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

popupNewCardForm.addEventListener('submit', addNewCard);
addNewCardButtonPopup.addEventListener('click', openAddCardPopup);
popupClosePopupButton.addEventListener('click', closePopup);
profileEditButton.addEventListener('click', openPopup);
popupExitButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editPersonData);
