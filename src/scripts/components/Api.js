export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._body = options.body;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка при обработке данный пользователя: ' + res.status);
    });
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
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка при редактировании профиля: ' + res.status);
      })
  }

  getAllCards() {
    return fetch(`${this._url}cards/`, {
        headers: this._headers
      })
      .then(res => {
        if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка при загрузке файлов с сервера: ' + res.status);
    })
  }

  addNewCard(data) {
    console.log(this._headers.authorization);
    return fetch(`${this._url}cards/`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка при добавлении новой карточки: ' + res.status);
    })
  }
}