import './index.css';

import { enableValidation } from "./validate.js";
import {createCard, popupOpenedImage } from "./card.js";
import { clickOverlay, closePopup, openPopup, closePopupKey } from "./modal.js";
import {changeNameOfUser, loadStartCards, SendNewProfile,
     sendNewCard, sendAvatarOfUser} from "./api.js"

const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');
const popupEditAvatar = document.querySelector('.avatar-popup')

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

const placesContainer = document.querySelector('.places');


function submitEditForm(evt) {
    evt.preventDefault()
    nameOfUser.textContent = inputNameOfUser.value;
    bioOfUser.textContent = inputBioOfUser.value;

    closePopup(popupEditProfile);

    inputNameOfUser.value = nameOfUser.textContent;
    inputBioOfUser.value = bioOfUser.textContent;
}

function submitAddForm(evt) {
    evt.preventDefault()
    const cardToAddInProfile = createCard(inputNameOfPlace.value, inputLinkOfPlace.value, openPopup);

    const nameElement = cardToAddInProfile.querySelector('.place__title').textContent;
    const imageElement = cardToAddInProfile.querySelector('.place__image').src;

    const cardToAdd = {
        name: nameElement,
        link: imageElement
    }

    closePopup(popupAddCard);
}

function submitAvatarForm(evt) {
    evt.preventDefault();
    closePopup(popupEditAvatar);
}

closePopupKey(closePopup)
clickOverlay(closePopup);

avatarOfUser.addEventListener('click', () => {openPopup(popupEditAvatar)});
buttonCloseAvatarPopup.addEventListener('click', () => {closePopup(popupEditAvatar)})

buttonOpenEditPopup.addEventListener('click', () => { openPopup(popupEditProfile) });
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEditProfile) });

buttonOpenAddPopup.addEventListener('click', () => { openPopup(popupAddCard) });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAddCard) });

buttonClosePopup.addEventListener('click', () => closePopup(popupOpenedImage));

formEditPorfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);
formEditAvatar.addEventListener('submit', submitAvatarForm);

formEditPorfile.addEventListener('submit', () => {
    SendNewProfile(buttonSubmitEditForm,inputNameOfUser.value, inputBioOfUser.value)
})

formAddPlace.addEventListener('submit', () => {
    sendNewCard(buttonSubmitAddForm, inputNameOfPlace.value, inputLinkOfPlace.value)
})

formEditAvatar.addEventListener('submit', () => {
    sendAvatarOfUser(buttonSubmitAvatarForm ,inputLinkOfAvatar.value) 
})

loadStartCards(placesContainer, openPopup)
enableValidation()
changeNameOfUser(nameOfUser, bioOfUser, avatarOfUser)