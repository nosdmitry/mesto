
// ищет открытый попап и возвращает данные для обработки.
// используется для обнуления ошибок валидации и проверки 
// статуса кнопки при открыти попапов


const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_type_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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

  resetValidation() {
    this._hideAllInputsErrors();
    this._checkButtonState();
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

  _findOpenedPopupItems() {
    const popup = document.querySelector('.popup_opened');
    console.log(popup);
    const inputs = Array.from(popup.querySelectorAll('.popup__input'));
    const button = popup.querySelector(this._submitButtonSelector);
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