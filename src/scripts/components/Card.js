export class Card {
  constructor( {name, link, _id, likes, owner}, templateSelector, openFullScreenImage, popupDeleteCard, api) {
    this._name = name;
    this._image = link;
    this._cardId = _id;
    this._likes = likes;
    this._cardOwnerId = owner._id;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.galery__img');
    this._likeButton = this._element.querySelector('.galery__heart');
    this._deleteButton = this._element.querySelector('.galery__delete-card-button');
    this._showPopupImage = () => openFullScreenImage(this._name, this._image);
    this._popupDeleteCard = popupDeleteCard;
    this._userData = api;
  }

  generateCard() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._userData.getUserInfo()
      .then(user => {
        if(user._id == this._cardOwnerId) {
          this._deleteButton.classList.remove('galery__delete-card-button_visible_hidden');
        }
      })
    this._element.querySelector('.galery__text').textContent = this._name;
    this._element.querySelector('.galery__likes-counter').textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.galery__card')
      .cloneNode(true);
    return cardElement;
  }

  _findCardOwner() {
    this._userData.getUserInfo()
      .then(user => console.log(user._id == this._cardOwnerId))
      .catch(err => console.log(err));
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._cardImage.addEventListener('click', () => {
      this._showPopupImage();
    });
    this._deleteButton.addEventListener('click', () => {
      console.log(this._cardOwnerId);
      this._findCardOwner();
      // console.log(this._userId);
      // this._popupDeleteCard.open();
      // this._popupDeleteCard.setEventListener();
      this._deleteCard();
    });
  }

  _handleLikeButton() {
    console.log(this._likes);
    this._likeButton.classList.toggle('galery__heart_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}
