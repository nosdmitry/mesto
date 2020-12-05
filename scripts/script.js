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
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

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

const galeryCards = document.querySelector('.galery__cards');
const galeryCardTamplate = document.querySelector('#galery__card').content;

function formGaleryCard(data) {
  const card = galeryCardTamplate.cloneNode(true);
  const cardImage = card.querySelector('.galery__img');
  const cardName = card.querySelector('.galery__text');
  cardImage.setAttribute('src', data.link);
  cardImage.setAttribute('title', data.name);
  cardName.textContent = data.name;
  return card;
}

function renderGaleryCards(data) {
  data.forEach(element => {
    galeryCards.append(formGaleryCard(element));
  });
}

renderGaleryCards(initialCards);


function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = personName.textContent;
  popupDescription.value = personDescription.textContent;
}

function closePopup() {
  const popups = document.querySelectorAll('.popup');
  console.log(popups);
  for (let i = 0; i < popups.length; i++) {
    if (popups[i].classList.contains('popup_opened')){
      popups[i].classList.remove('popup_opened');
    }
  }
}

const popupAddCard = document.querySelector('.popup__cards_add_form');
const addNewCardButtonPopup = document.querySelector('.profile__add-card-button');
const popupClosePopupButton = popupAddCard.querySelector('.popup__exit-button');

function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

addNewCardButtonPopup.addEventListener('click', openAddCardPopup);
popupClosePopupButton.addEventListener('click', closePopup);




function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupName.value;
  personDescription.textContent = popupDescription.value;
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


profileEditButton.addEventListener('click', openPopup);
popupExitButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editPersonData);