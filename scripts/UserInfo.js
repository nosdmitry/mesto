export class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
    this._userName = document.querySelector('.profile__title');
    this._userDescrtiption = document.querySelector('.profile__subtitle');
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name;
    userInfo.description = this._description;
    return userInfo;
  }
  
  setUserInfo() {
    this._userName.textContent = this._name;
    this._userDescrtiption.textContent = this._description;
  }
}