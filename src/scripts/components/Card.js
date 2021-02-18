export class Card {
  constructor(cardData, userData, templateSelector, openFullScreenImage, popupDeleteCard, api) {
    this._name = cardData.name;
    this._image = cardData.link;
    this._cardId = cardData._id;
    this._cardOwnerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._userId = userData._id;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.galery__img');
    this._likeButton = this._element.querySelector('.galery__heart');
    this._likeButtonLoading = this._element.querySelector('.galery__heart_loading');
    this._likesCounter = this._element.querySelector('.galery__likes-counter');
    this._deleteButton = this._element.querySelector('.galery__delete-card-button');
    this._showPopupImage = () => openFullScreenImage(this._name, this._image);
    this._popupDeleteCard = popupDeleteCard;
    this.api = api;
  }

  // Проверяет, поставил ли пользователь лайки
  _checkMyLike() {
    const myLike = Object.keys(this._likes).some(like => {
      return this._likes[like]._id == this._userId;
    });
    if(myLike) {
      this._likeButton.classList.add('galery__heart_active');
    }
  }

  // Создает кнопку удаления карточки только на своих карточках
  _createDeleteButton() {
    if(this._userId == this._cardOwnerId) {
      this._deleteButton.classList.remove('galery__delete-card-button_visible_hidden');
    }
  }

  generateCard() {
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._createDeleteButton();
    this._checkMyLike();
    this._element.querySelector('.galery__text').textContent = this._name;
    this._likesCounter.textContent = this._likes.length;
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
      this._popupDeleteCard.open(this.deleteCard);
    });
  }

  _toggleLikeButton(data) {
    this._likeButton.classList.toggle('galery__heart_active');
    this._likesCounter.textContent = data.likes.length;  
  }

  _loadingLikeButton(loading) {
    if(loading == true) {
      this._likeButton.classList.add('galery__heart_visible_hidden');
      this._likeButtonLoading.classList.remove('galery__heart_visible_hidden');
    } else {
      this._likeButton.classList.remove('galery__heart_visible_hidden');
      this._likeButtonLoading.classList.add('galery__heart_visible_hidden');
    }
  }

  _changeLikeStatus(apiRequest) {
    apiRequest
    .then(res => {
      this._toggleLikeButton(res);
    })
    .catch(err => console.log(err))
    .finally(() => this._loadingLikeButton(false));
  }

  // добавляет и удаляет лайки.
  // Значения берутся с сервера
  _handleLikeButton() {
    this._loadingLikeButton(true);
    if(this._likeButton.classList.contains('galery__heart_active')) {
      this._changeLikeStatus(this.api.removeLike(this._cardId));
    } else {
      this._changeLikeStatus(this.api.addLike(this._cardId));
    }
 }

  // удаление карточки
  deleteCard = () => {
    this._popupDeleteCard.changeButtonContent();
    this.api.deleteCard(this._cardId)
    .then(() => {
      this._element.remove();
    })
    .then(() => this._popupDeleteCard.close())
    .catch(err => console.log(err));
  }
}
