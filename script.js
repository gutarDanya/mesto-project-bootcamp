//МОДАЛЬНЫЕ ОКНА
const modalEditProfile = document.querySelector('.modal-window_place_edit-form');
const modalAddPlace = document.querySelector('.modal-window_place_add-form');
const modalImageActive = document.querySelector('.modal-window_place_image');

//ФОРМЫ
const formEditProfile = modalEditProfile.querySelector('.form');
const formAddPlace = modalAddPlace.querySelector('.form');

//СЕКЦИЯ ЭЛЕМЕНТЫ И ЕГО СОДЕРЖИМОЕ
const elementsSection = document.querySelector('.elements');
const elementImageOfOpenModalWindow = modalImageActive.querySelector('.image-popup__image');
const elementTextOfOpenModalWindow = modalImageActive.querySelector('.image-popup__text');

//КОНСТАНТЫ КНОПОК
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonOpentAddForm = document.querySelector('.profile__add-button');
const buttonCloseEditForm = modalEditProfile.querySelector('.form__close-button');
const buttonCloseAddForm = modalAddPlace.querySelector('.form__close-button');
const buttonCloseImageActive = modalImageActive.querySelector('.form__close-button');
const buttonLikePost = elementsSection.querySelector('.element__like');

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

function openPopup (nameModalWindow) {
    nameModalWindow.classList.add('modal-window_active');
}

function closePopup (nameOfModalWindow) {
    nameOfModalWindow.classList.remove('modal-window_active');
}

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

buttonOpenEditForm.addEventListener('click', () => openPopup(modalEditProfile));
buttonCloseEditForm.addEventListener('click', () => closePopup(modalEditProfile));

formEditProfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);

buttonOpentAddForm.addEventListener('click', () => openPopup(modalAddPlace));
buttonCloseAddForm.addEventListener('click', () => closePopup(modalAddPlace));

    for (let i = 0; i < initialCardList.length; i ++) {
createCard(initialCardList[i].name, initialCardList[i].link)
    };

