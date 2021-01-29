import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFullSizeImage = this._popupSelector.querySelector('.galery__fulsize-img');
    this._popupFullSizeImageText = this._popupSelector.querySelector('.galery__popup-text');
  }

  open = (imageName, imageLink) => {    
    this._popupFullSizeImage.setAttribute('src', imageLink);
    this._popupFullSizeImageText.setAttribute('alt', imageName);
    this._popupFullSizeImageText.textContent = imageName;  
    this._popupSelector.classList.add('popup_opened');
    this.setEventListener();
  }
}