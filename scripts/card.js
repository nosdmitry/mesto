class Card {
  constructor(data, cardSelector, openFullScreenImage) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._showPopupImage = () => openFullScreenImage(this._name, this._image);
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
    console.log('event listeners');
    this._element.querySelector('.galery__heart').addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.galery__img').addEventListener('click', () => {
      this._showPopupImage();
    });
    this._element.querySelector('.galery__delete-card-button').addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _handleLikeButton() {
    this._element.querySelector('.galery__heart').classList.toggle('galery__heart_active');
  }

  _deleteCard() {
    this._element.remove();
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

export { Card };