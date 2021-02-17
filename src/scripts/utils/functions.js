import { personAvatar, personAvatarLoading } from './constants.js';

export function loadingAvatar(loading) {
  if(loading == true) {
    personAvatar.classList.add('profile__image_visible_hidden');
    personAvatarLoading.classList.remove('profile__image_visible_hidden');
  } else {
    personAvatar.classList.remove('profile__image_visible_hidden');
    personAvatarLoading.classList.add('profile__image_visible_hidden');
  }
}