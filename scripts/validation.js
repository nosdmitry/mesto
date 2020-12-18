
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_type_disabled');
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove('popup__submit-button_type_disabled');
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListener = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    const buttonElement = formElement.querySelector('.popup__submit-button');
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  });
};

enableValidation();

//inputElement.addEventListener('input', isValid);

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 