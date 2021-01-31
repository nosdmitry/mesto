export class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name;
    userInfo.description = this._description;
    return userInfo;
  }
  
  setUserInfo() {

  }
}