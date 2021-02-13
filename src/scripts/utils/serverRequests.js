import { Api } from '../components/Api.js';

// Загрузка всех карточек
const getAllCardsApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards/',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f',
  }
});

// Получение данных о пользователе
const getUserApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
  headers: {
    authorization: '036c4f02-47a4-4c62-a975-bbce507f165f'
  }
});

// Изменение данных пользователя
const editUserApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/users/me',
  headers: {
    authorization: "036c4f02-47a4-4c62-a975-bbce507f165f",
    "Content-Type": "application/json"
  }
});

// Добавление новой карточки
const addNewCardApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-20/cards',
  headers: {
    authorization: "036c4f02-47a4-4c62-a975-bbce507f165f",
    "Content-Type": "application/json"
  }
})

export { getAllCardsApi, getUserApi, editUserApi, addNewCardApi }