import { modalWindowList, modalEditProfile, modalAddPlace, modalImageActive } from './modal.js';

//ФОРМЫ
const formEditProfile = modalEditProfile.querySelector('.form');
const formAddPlace = modalAddPlace.querySelector('.form');

//СЕКЦИЯ ЭЛЕМЕНТЫ И ЕГО СОДЕРЖИМОЕ
const elementsSection = document.querySelector('.elements');
const elementImageOfOpenModalWindow = modalImageActive.querySelector('.image-popup__image');
const elementTextOfOpenModalWindow = modalImageActive.querySelector('.image-popup__text');


//ИНПУТЫ
const inputNameOfUser = modalEditProfile.querySelector('.form__input_type_name');
const inputBioOfUser = modalEditProfile.querySelector('.form__input_type_bio');
const inputPostInfo = modalAddPlace.querySelector('.form__input_type_place');
const inputPostImage = modalAddPlace.querySelector('.form__input_type_image-url');

//TEMPLATE

//ЭЛЕМЕНТЫ ЭДИТ ФОРМЫ
const nameOfUser = document.querySelector('.profile__title');
const bioOfUser = document.querySelector('.profile__text');

import { initialCardList } from './data.js'
import { openPopup, closePopup, listenerOfModalWindowList } from './modal.js';

listenerOfModalWindowList();


const createCard = (NamePlace, imageOfElement) => {

    const templatePlaceContainer = document.querySelector('#post-template').content;
    const placeContainer = templatePlaceContainer.querySelector('.element').cloneNode(true);
    const nameOfPlace = placeContainer.querySelector('.element__place');
    const imageElement = placeContainer.querySelector('.element__image');
    const trash = placeContainer.querySelector('.element__delete-place');
    const buttonLikePlace = placeContainer.querySelector('.element__like');

    trash.addEventListener('click', function (evt) {
        const elementToDelete = trash.closest('.element');
        elementToDelete.remove();
    })

    nameOfPlace.textContent = NamePlace;

    buttonLikePlace.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    
    imageElement.src = imageOfElement;

    elementsSection.prepend(placeContainer);

    imageElement.addEventListener('click', () => {
        elementImageOfOpenModalWindow.src = imageElement.src;
        elementImageOfOpenModalWindow.alt = nameOfPlace.textContent;
        elementTextOfOpenModalWindow.textContent = nameOfPlace.textContent;
        openPopup(modalImageActive)
    });
}

//колбек для формы создания карточки
function submitAddForm (e) {
    e.preventDefault();
createCard(inputPostInfo.value, inputPostImage.value);

    inputPostInfo.value = '';
    inputPostImage.value = '';
};

//ИЗМЕНЕНИЕ ПРОФИЛЯ
function submitEditForm(e) {
    e.preventDefault();
    nameOfUser.textContent = inputNameOfUser.value;
    bioOfUser.textContent = inputBioOfUser.value;
    inputBioOfUser.value = '';
    inputNameOfUser.value = '';
}


formEditProfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);


modalWindowList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
 if (evt.target.classList.contains('modal-window_active')) {
    closePopup(popup)
 }
    })
})

    for (let i = 0; i < initialCardList.length; i ++) {
createCard(initialCardList[i].name, initialCardList[i].link)
    };


import { enableValidation } from './validation.js';

enableValidation()