import { personName, personDescription } from '../utils/constants.js';

export class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
    this._userName = personName;
    this._userDescrtiption = personDescription;
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