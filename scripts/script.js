
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

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.galery__card')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.galery__heart').addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.galery__img').addEventListener('click', () => {
      this._openFullScreenImage();
    });
  }

  _handleLikeButton() {
    this._element.querySelector('.galery__heart').classList.toggle('galery__heart_active');
  }

  _openFullScreenImage() {
    const popupFullSizeImage = document.querySelector('.galery__fulsize-img');
    const popupFullSizeImageText = document.querySelector('.galery__popup-text');
    popupFullSizeImage.setAttribute('src', this._image);
    popupFullSizeImage.setAttribute('alt', this._name);
    popupFullSizeImageText.textContent = this._name;  
    openPopup(popupFullSizeCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.galery__img').src = this._image;
    this._element.querySelector('.galery__img').alt = this._name;
    this._element.querySelector('.galery__text').textContent = this._name;
    return this._element;
  }
}

initialCards.forEach((element) => {
  const card = new Card(element, '.galery_card-tamplate');
  const cardElement = card.generateCard(card);
  galeryCards.append(cardElement);
  console.log(cardElement);
});


// function renderGaleryCards() {
//   const listItems = initialCards.map(createGaleryCard);
//   galeryCards.append(...listItems);
// }


// формирует попап с картинкой и текстом и подставляет
// значения из карточки
// function createFullSizeImagePopup(imageUrl, imageText) {
//   const popupFullSizeImage = document.querySelector('.galery__fulsize-img');
//   const popupFullSizeImageText = document.querySelector('.galery__popup-text');
//   popupFullSizeImage.setAttribute('src', imageUrl);
//   popupFullSizeImage.setAttribute('alt', imageText);
//   popupFullSizeImageText.textContent = imageText;  
//   openPopup(popupFullSizeCard);
// }

// формирует карточку галереи
function createGaleryCard(data) {
  
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
    createFullSizeImagePopup(data.link, data.name);  
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
  const newCard = createGaleryCard({
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

// ссылка на функцию для обработки слушателя 
// закрытия попапа
const escapeKey = handlerEsqKey;

function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  handlePopupOverlayClick(popupName);
  document.addEventListener('keydown', escapeKey);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeKey);
}

// Вызывает созданные карточки
//renderGaleryCards(initialCards);

// открывает попап для редактирования профиля и подставляет данные
editProfileButton.addEventListener('click', () => {
  openPopup(popupProfile);
  clearEveryFormInputs();
  popupPersonName.value = personName.textContent;
  popupPersonDescription.value = personDescription.textContent;
  checkButtonState(config);
  hideAllInputsErrors(config);
});

exitProfilePopupButton.addEventListener('click', () => {  
  closePopup(popupProfile);
});

addNewCardButtonPopup.addEventListener('click', () => {
  clearEveryFormInputs();  
  openPopup(popupAddCard);
  hideAllInputsErrors(config);
  checkButtonState(config);
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
