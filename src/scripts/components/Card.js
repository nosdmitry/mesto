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
    this._likesCounter = this._element.querySelector('.galery__likes-counter');
    this._deleteButton = this._element.querySelector('.galery__delete-card-button');
    this._showPopupImage = () => openFullScreenImage(this._name, this._image);
    this._popupDeleteCard = popupDeleteCard;
    this.api = api;
  }

  _checkMyLike() {
    this.api.getUserInfo()
      .then(user => {
        const myLike = Object.keys(this._likes).some(like => {
          return user._id == this._likes[like]._id;
        })
        return myLike;
      })
      .then((myLike) => {
        if(myLike) {
          this._likeButton.classList.add('galery__heart_active');
        }
      })
      .catch(err => console.log(err));
  }

  _createDeleteButton() {
    this.api.getUserInfo()
      .then(user => {
        if(user._id === this._cardOwnerId) {
          this._deleteButton.classList.remove('galery__delete-card-button_visible_hidden');
        }
      })
      .catch(err => console.log(err));
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
      this._popupDeleteCard.open();
      this._popupDeleteCard.setEventListener(this.deleteCard);
    });
  }

  _toggleLikeButton(data) {
    this._likeButton.classList.toggle('galery__heart_active');
    this._likesCounter.textContent = data.likes.length;  
  }

  _handleLikeButton() {
    if(this._likeButton.classList.contains('galery__heart_active')) {
      this.api.removeLike(this._cardId)
        .then(res => {
          this._toggleLikeButton(res);
        })
        .catch(err => console.log(err));
    } else {
      this.api.addLike(this._cardId)
        .then(res => {
          this._toggleLikeButton(res);
        })
        .catch(err => console.log(err));
    }
 }

  deleteCard = () => {
    this.api.deleteCard(this._cardId)
      .then(() => {
        this._element.remove();
        console.log('deleted!');
      })
      .catch(err => console.log(err));
  }
}
