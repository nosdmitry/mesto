
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


// формирует попап с картинкой и текстом и подставляет
// значения из карточки
function formFullSizeImagePopup(imageUrl, imageText) {
  const popupFullSizeImage = document.querySelector('.galery__fulsize-img');
  const popupFullSizeImageText = document.querySelector('.galery__popup-text');
  popupFullSizeImage.setAttribute('src', imageUrl);
  popupFullSizeImage.setAttribute('alt', imageText);
  popupFullSizeImageText.textContent = imageText;  
}

// формирует карточку галереи
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

  cardImage.addEventListener('click', () => {
    formFullSizeImagePopup(data.link, data.name);  
    openPopup(popupFullSizeCard);
  });

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

// открывает любой попап и ожидает нажатие на Esc 
// либо клик на оверлей
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => {
    if(evt.code == 'Escape') {
      closePopup(popupName);
      console.log('presed');
    }
  });
  const popupList = document.querySelectorAll('.popup');
  [...popupList].forEach(element => {
    element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup')) {
        closePopup(popupName);
      }
    });
  });
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  findAllInputsErrors(popupName);
}



// Вызывает созданные карточки
renderGaleryCards(initialCards);

// открывает попап для редактирования профиля и подставляет данные
editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
  enableValidation();
  findAllInputsErrors(popupProfile);
});

exitProfilePopupButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

addNewCardButtonPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
});

exitAddCardPopupButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});

exitFullScreenImagePopup.addEventListener('click', () => {
  closePopup(popupFullSizeCard);
});

popupProfileEditForm.addEventListener('submit', editPersonData);
popupNewCardForm.addEventListener('submit', addNewCard);
