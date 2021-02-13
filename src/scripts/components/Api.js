export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(this._url, {
      headers: this._headers
    })
    .then(res => {
      if(res.ok) {
        console.log('UserInfo  OK!');
        return res.json();
      }
      return Promise.reject('Ошибка при обработке данный пользователя: ' + res.status);
    })
  }

  getInitianCards() {
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



}