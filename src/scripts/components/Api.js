export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  getInitianCards() {
    return fetch(this._url, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка!!!!! - ' + res.status);
    })
  }
}