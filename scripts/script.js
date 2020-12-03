/********************************************/
/*                                          */
/* This script works with popup window,     */
/* where you may change profile name and    */
/* description                              */
/*                                          */
/********************************************/

const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit');
const popupExitButton = popup.querySelector('.popup__exit-button');
const popupExitOverlay = popup.querySelector('.popup__overlay');
const popupForm = popup.querySelector('.popup__form');
const formSubmitButton = popupForm.querySelector('.popup__submit-button');

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

const galery = document.querySelector('.galery');
const cardsContainer = document.querySelector('.galery__cards');

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

function createCards(card) {
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
  console.log(cardsContainer);
}

for (let i = 0; i < initialCards.length; i++) {
  galery.append(createCards(initialCards[i]));
}

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = personName.textContent;
  popupDescription.value = personDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

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