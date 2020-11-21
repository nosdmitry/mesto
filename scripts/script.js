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

const personName = document.querySelector('.profile__title');
const personDescription = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__input_type_name');
const popupDescription = document.querySelector('.popup__input_type_description');

// adding person data to "input's" tags
profileEditButton.addEventListener('click', addPersonData);
function addPersonData() {
  popupName.value = personName.textContent;
  popupDescription.value = personDescription.textContent;
}

// adding person data from popup to main page
popupForm.addEventListener('submit', editPersonData);
function editPersonData(event) {
  event.preventDefault();
  personName.textContent = popupName.value;
  personDescription.textContent = popupDescription.value;
  handlePopup();
}
