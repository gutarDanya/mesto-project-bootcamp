import '../pages/index.css';

import { enableValidation } from "./validate.js";
import {initialCards, createCard, popupOpenedImage } from "./card.js";
import { clickOverlay, closePopup, openPopup, closePopupKey } from "./modal.js";

const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');

const formEditPorfile = popupEditProfile.querySelector('.form');
const formAddPlace = popupAddCard.querySelector('.form');

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseAddPopup = popupAddCard.querySelector('.popup__button-close');
const buttonclosePopup = popupOpenedImage.querySelector('.popup__button-close');

const inputNameOfUser = popupEditProfile.querySelector('#name');
const inputBioOfUser = popupEditProfile.querySelector('#bio');
const inputNameOfPlace = popupAddCard.querySelector('#place');
const inputLinkOfPlace = popupAddCard.querySelector('#link');

const nameOfUser = document.querySelector('.profile__title');
const bioOfUser = document.querySelector('.profile__bio');

const placesContainer = document.querySelector('.places');


function submitEditForm(evt) {
    evt.preventDefault()
    nameOfUser.textContent = inputNameOfUser.value;
    bioOfUser.textContent = inputBioOfUser.value;

    closePopup(popupEditProfile);
}

function submitAddForm(evt) {
    evt.preventDefault();
    const cardToAddInProfile =createCard(inputNameOfPlace.value, inputLinkOfPlace.value, openPopup);

    const nameElement = cardToAddInProfile.querySelector('.place__title').textContent;
    const imageElement = cardToAddInProfile.querySelector('.place__image').src;

    const cardToAdd = {
        name: nameElement,
        link: imageElement
    }

    initialCards.push(cardToAdd);

    closePopup(popupAddCard);

    placesContainer.prepend(createCard(initialCards[initialCards.length - 1].name, initialCards[initialCards.length - 1].link, openPopup))
}

closePopupKey()
clickOverlay(closePopup);

buttonOpenEditPopup.addEventListener('click', () => { openPopup(popupEditProfile) });
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEditProfile) });

buttonOpenAddPopup.addEventListener('click', () => { openPopup(popupAddCard) });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAddCard) });

buttonclosePopup.addEventListener('click', () => closePopup(popupOpenedImage));

formEditPorfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);

initialCards.forEach((item) => {
    placesContainer.prepend(createCard(item.name, item.link, openPopup));
});

enableValidation()