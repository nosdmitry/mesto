import './index.css';

import { Section }            from '../scripts/components/Section.js';
import { Card }               from '../scripts/components/Card.js';
import { PopupWithImage }     from '../scripts/components/PopupWithImage.js';
import { PopupWithForm }      from '../scripts/components/PopupWithForm.js';
import { PopupWithSubmit }    from '../scripts/components/PopupWithSubmit.js';
import { UserInfo }           from '../scripts/components/UserInfo.js';
import { FormValidator }      from '../scripts/components/Formvalidator.js';
import { Api }                from '../scripts/components/Api';

import { cardListSelector, popupProfile, editProfileButton, popupAddCard, popupDeleteCard,
  addNewCardButtonPopup, popupFullSizeCard, personAvatar, popupPersonAvatar, popupPersonName, 
  personName, personDescription, popupPersonDescription, galeryLoading, popupAddNewCardButtonSubmit,
  popupEditProfileButtonSubmit, popupAvatarChangeButtonSubmit,
  config }                    
                              from '../scripts/utils/constants.js';

import { loadingAvatar }      from '../scripts/utils/functions.js';


const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
const changeUserAvatarValidation = new FormValidator(config, '.popup__form_edit_avatar');
const popupWithImage = new PopupWithImage(popupFullSizeCard);
const popupWithDeleteButton = new PopupWithSubmit(popupDeleteCard);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f'
  }
});

// Рендер каждой карточки
const cardList = new Section({
  renderer: (cardData, userData) => {
    cardList.addItem(createNewCard(cardData, userData));
  }
}, cardListSelector);

const user = new UserInfo({ 
  name: personName, 
  description: personDescription,
  avatar: personAvatar
});

// Форма изменения аватара
// Отправляет данные из сервера и записывает их в DOM 
const popupChangeUserAvatar = new PopupWithForm({
  popupSelector: popupPersonAvatar,
  handleFormSubmit: (formData) => {
    popupAvatarChangeButtonSubmit.textContent = 'Сохранение...';
    api.changeAvatar({
      avatar: formData.popup_description
    })
    .then(newLink => {
      user.setUserAvatar({ avatar: `url(${newLink.avatar}`});
      popupChangeUserAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatarChangeButtonSubmit.textContent = 'Сохранить');
  }
})  

// Форма данных пользователя. 
// Загружает данные на сервер и обновляет в DOM
const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
    popupEditProfileButtonSubmit.textContent = 'Сохранение...';
    api.editUserInfo({
      name: formData.popup_name,
      about: formData.popup_description
    })
    .then(data => {
      console.log(data)
      user.setUserInfo({
        inputName: data.name, 
        inputDescription: data.about
      });
      popupEditProfileForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEditProfileButtonSubmit.textContent = 'Сохранить');
  }
});

// Форма сознания новой карточки
// Создает экземпляр и записывает данные на сервер
// В качестве рендера использует метод класса Section
const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    popupAddNewCardButtonSubmit.textContent = 'Сохранение...';
    api.addNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    })
    .then(data => { 
      console.log(data);
      cardList.addItem(createNewCard(data, data.owner));
      popupAddNewCard.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAddNewCardButtonSubmit.textContent = 'Создать');
  }
});

// Создает экземпляр карточки
// Используется при рендере всек начальных карт и 
// при создании новой карточки через форму
function createNewCard(cardData, userData) {
  const card = new Card(cardData, userData, '.galery_card-tamplate', popupWithImage.open, popupWithDeleteButton, api);
  const cardElement = card.generateCard(card);
  return cardElement;
}

// Загружает и рендерит все элементы карточек с сервера
loadingAvatar(true);
Promise.all([
  api.getUserInfo(),
  api.getAllCards()
])
  .then(res => {
     console.log(res);
    
    user.setUserInfo({
      inputName: res[0].name,
      inputDescription: res[0].about
    });
    user.setUserAvatar({
      avatar: `url(${res[0].avatar})`
    });

    cardList.renderItems(res[1].reverse(), res[0]);
  })
  .catch(err => console.log(err))
  .finally(() => {
    loadingAvatar(false);
    galeryLoading.classList.add('galery__card_loading_hidden');
  });

// Загружает данные пользователя с сервера и подставляет значения в DOM

editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();
popupWithImage.setEventListener();
popupAddNewCard.setEventListener();
popupEditProfileForm.setEventListener();
popupWithDeleteButton.setEventListener();

editProfileButton.addEventListener('click', () => {
  const userData = user.getUserInfo();
  popupEditProfileForm.open();
  popupPersonName.value = userData.name;
  popupPersonDescription.value = userData.description;
  editProfileValidation.resetValidation();
});

personAvatar.addEventListener('click', () => {
  popupChangeUserAvatar.open();
  changeUserAvatarValidation.enableValidation();
  popupChangeUserAvatar.setEventListener();
});

addNewCardButtonPopup.addEventListener('click', () => {
  popupAddNewCard.open();
  addNewCardValidation.resetValidation();
});
