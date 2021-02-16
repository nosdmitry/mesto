import './index.css';

import { Section }            from '../scripts/components/Section.js';
import { Card }               from '../scripts/components/Card.js';
import { PopupWithImage }     from '../scripts/components/PopupWithImage.js';
import { PopupWithForm }      from '../scripts/components/PopupWithForm.js';
import { PopupDeleteCard }    from '../scripts/components/PopupDeleteCard.js';
import { UserInfo }           from '../scripts/components/UserInfo.js';
import { FormValidator }      from '../scripts/components/Formvalidator.js';
import { Api }                from '../scripts/components/Api';

import { cardListSelector, popupProfile, editProfileButton, popupAddCard, popupDeleteCard,
  addNewCardButtonPopup, popupFullSizeCard, personAvatar, popupPersonAvatar, popupPersonName, 
  personName, personDescription, popupPersonDescription, profileImage, 
  config }                    from '../scripts/utils/constants.js';


const editProfileValidation = new FormValidator(config, '.popup_profile_edit-form');
const addNewCardValidation = new FormValidator(config, '.popup_cards_add-form');
const changeUserAvatarValidation = new FormValidator(config, '.popup__form_edit_avatar');
const popupWithImage = new PopupWithImage(popupFullSizeCard);
const popupWithDeleteCard = new PopupDeleteCard(popupDeleteCard);

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f'
  }
});

// Рендер каждой карточки
const cardList = new Section({
  renderer: (cardItem) => {
    cardList.addItem(createNewCard(cardItem));
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
    api.changeAvatar({
      avatar: formData.popup_description
    })
    .then(newLink => {
      //personAvatar.style.backgroundImage = `url(${newLink.avatar})`;
      user.setUserAvatar({ avatar: `url(${newLink.avatar}`});
    })
    .then(() => {
      popupChangeUserAvatar.close();
    })
    .catch(err => console.log(err));
  }
})  



console.log(user);
// Форма данных пользователя. 
// Загружает данные на сервер и обновляет в DOM
const popupEditProfileForm = new PopupWithForm({
  popupSelector: popupProfile,
  handleFormSubmit: (formData) => {
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
    })
    .then(() => popupEditProfileForm.close())
    .catch(err => console.log(err));
  }
});

// Форма сознания новой карточки
// Создает экземпляр и записывает данные на сервер
// В качестве рендера использует метод класса Section
const popupAddNewCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (formData) => {
    api.addNewCard({
      name: formData.popup_name,
      link: formData.popup_description
    })
    .then(data => cardList.addItem(createNewCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner
    })))
    .catch(err => console.log(err));
    popupAddNewCard.close();
  }
});

// Создает экземпляр карточки
// Используется при рендере всек начальных карт и 
// при создании новой карточки через форму
function createNewCard(cardData, userData) {
  const card = new Card(cardData, userData, '.galery_card-tamplate', popupWithImage.open, popupWithDeleteCard, api);
  const cardElement = card.generateCard(card);
  return cardElement;
}

// Загружает и рендерит все элементы карточек с сервера

Promise.all([
  api.getUserInfo(),
  api.getAllCards()
])
  .then(res => {
    console.log(res[0]);
    console.log(res[1]);
    cardList.renderItems(res[1], res[0]);
  })
  .catch(err => console.log(err))

// Загружает данные пользователя с сервера и подставляет значения в DOM
api.getUserInfo()
  .then(userData => {
    console.log(userData);
    user.setUserInfo({
      inputName: userData.name,
      inputDescription: userData.about
    });
    user.setUserAvatar({
      avatar: `url(${userData.avatar})`
    });
  })
  .catch(err => console.log(err));

editProfileValidation.enableValidation();
addNewCardValidation.enableValidation();
popupWithImage.setEventListener();
popupAddNewCard.setEventListener();
popupEditProfileForm.setEventListener();

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
