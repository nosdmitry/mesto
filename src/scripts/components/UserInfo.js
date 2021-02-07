export class UserInfo {
  constructor({ name, description }) {
    this._nameSelector = name;
    this._descriptionSelector = description;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameSelector.textContent;
    userInfo.description = this._descriptionSelector.textContent;
    return userInfo;
  }
  
  setUserInfo(inputName, inputDescription) {
    this._nameSelector.textContent = inputName;
    this._descriptionSelector.textContent = inputDescription;
  }
}