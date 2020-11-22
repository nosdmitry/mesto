/******************************************
/* This script works with popup window, 
/* where you may change profile name and 
/* description
*******************************************/

const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit');
const popupExitButton = popup.querySelector('.popup__exit-button');
const popupExitOverlay = popup.querySelector('.popup__overlay');
const popupForm = popup.querySelector('.popup__form');
const formSubmitButton = popupForm.querySelector('.popup__submit-button');

profileEditButton.addEventListener('click', handlePopup);
popupExitButton.addEventListener('click', handlePopup);
popupExitOverlay.addEventListener('click', handlePopup);

function handlePopup() {
  popup.classList.toggle('popup_opened');

}

// Closing popup with Esqape button
document.onkeydown = pressEsqape;
function pressEsqape(pressedKey) {
  if (popup.classList.contains('popup_opened')){
    if (pressedKey.keyCode == 27) {
      handlePopup();
    }
  }
}

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

// adding person data to "input's" tags in popup
profileEditButton.addEventListener('click', addPersonData);
function addPersonData() {
  popupName.value = personName.textContent;
  popupDescription.value = personDescription.textContent;
  setErrorEmptyInput(popupName, error = false);
  setErrorEmptyInput(popupDescription, error = false);
}

// adding texts from popup to main page
// if there is no text - input decorates with red line
popupForm.addEventListener('submit', editPersonData);
function editPersonData(event) {
  event.preventDefault();
  let error = false;
  if (popupName.value != '') {
    personName.textContent = popupName.value;
  } else {
    setErrorEmptyInput(popupName, error = true);
  }
  if (popupDescription.value != '') {
    personDescription.textContent = popupDescription.value;
  } else {
    setErrorEmptyInput(popupDescription, error = true);
  }
  if (error != true) {
    setErrorEmptyInput(popupName, error);
    setErrorEmptyInput(popupDescription, error);
    handlePopup();   
  }
}

// making red line if error
function setErrorEmptyInput(inputName, error = false) {
  if (error != false) {
    inputName.classList.add('popup__input_error_empty');
  } else {
    inputName.classList.remove('popup__input_error_empty');
  }
}
