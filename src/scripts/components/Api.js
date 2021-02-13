export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._body = options.body;
  }

  getUserInfo() {
    return fetch(this._url, {
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
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
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
    return fetch(this._url, {
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
    return fetch(this._url, {
      method: 'POST',
      headers: this._headers,
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