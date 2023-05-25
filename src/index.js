import './index.css';

import { enableValidation } from "./components/validate.js";
import {popupOpenedImage } from "./components/card.js";
import { clickOverlay, closePopup, openPopup, closePopupKey } from "./components/modal.js";
import {changeNameOfUser, loadStartCards, SendNewProfile,
     sendNewCard, sendAvatarOfUser} from "./components/api.js"

const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');
const popupEditAvatar = document.querySelector('.avatar-popup');

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

avatarOfUser.addEventListener('click', () => {openPopup(popupEditAvatar)});
buttonCloseAvatarPopup.addEventListener('click', () => {closePopup(popupEditAvatar)})

buttonOpenEditPopup.addEventListener('click', () => { openPopup(popupEditProfile) });
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEditProfile) });

buttonOpenAddPopup.addEventListener('click', () => { openPopup(popupAddCard) });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAddCard) });

buttonClosePopup.addEventListener('click', () => closePopup(popupOpenedImage));

formEditPorfile.addEventListener('submit', () => {
    SendNewProfile(buttonSubmitEditForm,inputNameOfUser.value, inputBioOfUser.value, nameOfUser, bioOfUser,  inputNameOfUser.value, inputBioOfUser.value, popupEditProfile)
})

formAddPlace.addEventListener('submit', () => {
    sendNewCard(inputNameOfPlace.value, inputLinkOfPlace.value, popupAddCard, buttonSubmitAddForm)
})

formEditAvatar.addEventListener('submit', () => {
    sendAvatarOfUser(buttonSubmitAvatarForm ,inputLinkOfAvatar.value, avatarOfUser, popupEditAvatar) 
})

closePopupKey(closePopup)
clickOverlay(closePopup);
loadStartCards(placesContainer, openPopup)
enableValidation()
changeNameOfUser(nameOfUser, bioOfUser, avatarOfUser)