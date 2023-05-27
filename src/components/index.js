import '../index.css';

import { enableValidation } from "./validate.js";
import { popupOpenedImage, createCard } from "./card.js";
import { clickOverlay, closePopup, openPopup, closePopupKey } from "./modal.js";
import {
    startNameOfUser, loadStartCards, sendNewProfile,
    sendNewCard, sendAvatarOfUser
} from "./api.js"

const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');
const popupEditAvatar = document.querySelector('.avatar-popup');

let userId = null;

const formEditPorfile = popupEditProfile.querySelector('.form');
const formAddPlace = popupAddCard.querySelector('.form');
const formEditAvatar = popupEditAvatar.querySelector('.form');

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseAddPopup = popupAddCard.querySelector('.popup__button-close');
const buttonClosePopup = popupOpenedImage.querySelector('.popup__button-close');
const buttonCloseAvatarPopup = popupEditAvatar.querySelector('.popup__button-close');


const buttonSubmitAvatarForm = popupEditAvatar.querySelector('.form__button-submit');
const buttonSubmitAddForm = popupAddCard.querySelector('.form__button-submit');
const buttonSubmitEditForm = popupEditProfile.querySelector('.form__button-submit');

const inputNameOfUser = popupEditProfile.querySelector('#name');
const inputBioOfUser = popupEditProfile.querySelector('#bio');
const inputNameOfPlace = popupAddCard.querySelector('#place');
const inputLinkOfPlace = popupAddCard.querySelector('#link');
const inputLinkOfAvatar = popupEditAvatar.querySelector('#avatar');

const nameOfUser = document.querySelector('.profile__title');
const bioOfUser = document.querySelector('.profile__bio');
const avatarOfUser = document.querySelector('.profile__avatar');

export const placesContainer = document.querySelector('.places');

Promise.all([
    startNameOfUser(),
    loadStartCards()
])
    .then(([user, cards]) => {
        userId = user._id
        localStorage.setItem('userId', userId)
        nameOfUser.textContent = user.name;
        bioOfUser.textContent = user.about;
        avatarOfUser.src = user.avatar
        cards.forEach((card) => {
            placesContainer.prepend(createCard(card.name, card.link, card.likes.length, openPopup, userId, card._id, card.likes))
        })
    })
    .catch(([user, cards]) => {
        nameOfUser.textContent = `Ошибка загрузки имени:${user.status}${user.statustext}, сорян`;
        bioOfUser.textContent = `Ошибка загрузки биографии:${user.status}${user.statustext}, сегодня без био`
        avatarOfUser.src = 'https://thumbs.dreamstime.com/z/error-sign-error-message-icon-logo-dark-background-white-error-sign-error-message-icon-logo-dark-background-133331672.jpg'
        console.log(cards.status)
    })

avatarOfUser.addEventListener('click', () => { openPopup(popupEditAvatar) });
buttonCloseAvatarPopup.addEventListener('click', () => { closePopup(popupEditAvatar) })

buttonOpenEditPopup.addEventListener('click', () => {
    openPopup(popupEditProfile)
    inputNameOfUser.value = nameOfUser.textContent;
    inputBioOfUser.value = bioOfUser.textContent;
});
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEditProfile) });

buttonOpenAddPopup.addEventListener('click', () => { openPopup(popupAddCard) });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAddCard) });

buttonClosePopup.addEventListener('click', () => closePopup(popupOpenedImage));

formEditPorfile.addEventListener('submit', () => {
    buttonSubmitEditForm.textContent = 'Сохранение...'
    sendNewProfile(inputNameOfUser.value, inputBioOfUser.value)
        .then((data) => {
            nameOfUser.textContent = data.name;
            bioOfUser.textContent = data.about;

            closePopup(popupEditProfile);

            inputNameOfUser.value = nameOfUser.textContent;
            inputBioOfUser.value = bioOfUser.textContent;
        })
        .catch((err) => {
            console.log(`Ошибка сохранения профиля:${err.status}`)
        })
        .finally(() => {
            buttonSubmitEditForm.textContent = 'Сохранить'
        });
})

formAddPlace.addEventListener('submit', () => {
    buttonSubmitAddForm.textContent = 'Сохранение...'
    sendNewCard(inputNameOfPlace.value, inputLinkOfPlace.value)
        .then((card) => {
            placesContainer.prepend(createCard(card.name, card.link, card.likes.length, openPopup, card.owner._id, card._id, card.likes))
            closePopup(popupAddCard)
        })
        .catch((err) => {
            console.log(`Ошибка при сохранении карточки: ${err.status}${err.statusText}`)
        })
        .finally(() => {
            buttonSubmitAddForm.textContent = 'Сохранить'
        });
})

formEditAvatar.addEventListener('submit', () => {
    buttonSubmitAvatarForm.textContent = 'Сохранение...'
    sendAvatarOfUser(inputLinkOfAvatar.value)
        .then((data) => {
            avatarOfUser.src = data.avatar;
            closePopup(popupEditAvatar)
        })
        .catch((err) => {
            console.log(`Ошибка при поптыке изменить аватар: ${err.status} ${err.statusText}`)
        })
        .finally(() => {
            buttonSubmitAvatarForm.textContent = 'Сохранить'
        });
})

clickOverlay(closePopup);
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-submit',
    inactiveButtonClass: 'form__button-submit_disabled',
    inactieErrorClass: 'form__input_type_error',
    errorClass: 'form__error_active',
})
