export class UserInfo {
  constructor({ name, description, avatar }) {
    this._nameSelector = name;
    this._descriptionSelector = description;
    this._avatarSelector = avatar;
    this.userData;
  }

  getAllUserData(userData) {
    this.userData = userData;
  }

  setAllUserData() {
    return this.userData;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameSelector.textContent;
    userInfo.description = this._descriptionSelector.textContent;
    userInfo.avatar = this._avatarSelector.style.backgroundImage;
    return userInfo;
  }

  setUserAvatar({ avatar }) {
    this._avatarSelector.style.backgroundImage = avatar;
  }
  
  setUserInfo({inputName, inputDescription}) {
    this._nameSelector.textContent = inputName;
    this._descriptionSelector.textContent = inputDescription;
  }
}