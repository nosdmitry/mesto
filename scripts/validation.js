// const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// const isValid = (formElement, inputElement, {...rest}) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, rest);
//   } else {
//     hideInputError(formElement, inputElement, rest);
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// const setEventListener = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, rest);
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener('input', () => {
//       isValid(formElement, inputElement, rest);
//       toggleButtonState(inputList, buttonElement, rest);
//     });
//   });
// };

// const enableValidation = ({formSelector, ...rest}) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListener(formElement, rest);
//   });
// };

// ищет открытый попап и возвращает данные для обработки.
// используется для обнуления ошибок валидации и проверки 
// статуса кнопки при открыти попапов
// function findOpenedPopupItems({inputSelector, submitButtonSelector}) {
//   const popup = document.querySelector('.popup_opened');
//   const inputs = Array.from(popup.querySelectorAll(inputSelector));
//   const button = popup.querySelector(submitButtonSelector);
//   const result = {
//     popupName: popup, 
//     inputList: inputs,
//     submitButton: button,
//   }
//   return result;
// }

// // обнуляет ошибки
// function hideAllInputsErrors({...rest}) {
//   const popup = findOpenedPopupItems(rest);
//   popup.inputList.forEach(inputElement => {
//     hideInputError(popup.popupName, inputElement, rest);
//   });
// }

// // проверяет статус кнопки
// function checkButtonState({...rest}) {
//   const popup = findOpenedPopupItems(rest);  
//   toggleButtonState(popup.inputList, popup.submitButton, rest);
// }

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//enableValidation(config);

class FormValidator {
  constructor(config, validatedForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._validatedForm = validatedForm;
  }

  enableValidation() {
    const form = document.querySelector(this._validatedForm);
    const formList = Array.from(form.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = 'disabled';
      console.log('button disabled');
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
      console.log('button enable');
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /* ************ */
  _findOpenedPopupItems() {
    const popup = document.querySelector('.popup_opened');
    const inputs = Array.from(popup.querySelectorAll(inputSelector));
    const button = popup.querySelector(submitButtonSelector);
    const result = {
      popupName: popup, 
      inputList: inputs,
      submitButton: button,
    }
    return result;
  }

  // обнуляет ошибки
  _hideAllInputsErrors() {
    const popup = this._findOpenedPopupItems();
    popup.inputList.forEach(inputElement => {
      this._hideInputError(popup.popupName, inputElement);
    });
  }

  // проверяет статус кнопки
  _checkButtonState() {
    const popup = this._findOpenedPopupItems();  
    this._toggleButtonState(popup.inputList, popup.submitButton);
  }
}

const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
editProfileValidation.enableValidation();

const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
addNewCardValidation.enableValidation();