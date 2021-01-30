class Card {
  constructor( {name, link}, templateSelector, openFullScreenImage) {
    this._name = name;
    this._image = link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.galery__img');
    this._likeButton = this._element.querySelector('.galery__heart');
    this._deleteButton = this._element.querySelector('.galery__delete-card-button');
    this._showPopupImage = () => openFullScreenImage(this._name, this._image);
  }

  generateCard() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._element.querySelector('.galery__text').textContent = this._name;
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._cardImage.addEventListener('click', () => {
      this._showPopupImage();
    });
    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('galery__heart_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };