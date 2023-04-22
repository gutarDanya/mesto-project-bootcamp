const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');

const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseAddPopup = popupAddCard.querySelector('.popup__button-close');

const inputNameOfUser = popupEditProfile.querySelector('#name');
const inputBioOfUser = popupEditProfile.querySelector('#bio');

function openPopup(popup) {
popup.classList.add('popup_active');
}

function closePopup(popup) {
    popup.classList.remove('popup_active')
}

buttonOpenEditPopup.addEventListener('click', () => {openPopup(popupEditProfile)});
buttonCloseEditPopup.addEventListener('click', () => {closePopup(popupEditProfile)});

buttonOpenAddPopup.addEventListener('click', () => {openPopup(popupAddCard)});
buttonCloseAddPopup.addEventListener('click', () => {closePopup(popupAddCard)});