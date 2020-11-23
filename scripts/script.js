/********************************************/
/*                                          */
/* This script works with popup window,     */
/* where you may change profile name and    */
/* description                              */
/*                                          */
/********************************************/

const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit');
const popupExitButton = popup.querySelector('.popup__exit-button');
const popupExitOverlay = popup.querySelector('.popup__overlay');
const popupForm = popup.querySelector('.popup__form');
const formSubmitButton = popupForm.querySelector('.popup__submit-button');

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = personName.textContent;
  popupDescription.value = personDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupName.value;
  personDescription.textContent = popupDescription.value;
  closePopup();
}

//  Closing popup with Esqape button
document.onkeydown = pressEsqape = (pressedKey) => {
  if (popup.classList.contains('popup_opened')){
    if (pressedKey.keyCode == 27) {
      closePopup();
    }
  }
};

profileEditButton.addEventListener('click', openPopup);
popupExitButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', editPersonData);