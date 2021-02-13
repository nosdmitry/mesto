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
        console.log('UserInfo  OK!');
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
          console.log('It is ok');
          return res.json();
        }
        return Promise.reject('Ошибка при редактировании профиля: ' + res.status);
      })
  }









  // editData() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-20/users/me', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: '036c4f02-47a4-4c62-a975-bbce507f165f',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: 'TestName888',
  //       about: 'Physicist and Chemist'
  //     })
  //   });
  // }

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