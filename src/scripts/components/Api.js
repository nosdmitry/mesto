export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._body = options.body;
  }

  _onError = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при обращении к серверу: ` + res.status);
  }
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(this._onError)
  }

  editUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      .then(this._onError);
  }

  getAllCards() {
    return fetch(`${this._url}cards/`, {
        headers: this._headers
      })
      .then(this._onError);
  }

  addNewCard(data) {
    return fetch(`${this._url}cards/`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(this._onError)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._onError)
  }

  addLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._onError)
  }

  removeLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._onError)
  }

  changeAvatar(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(this._onError)
  }
}