export const popupOpenedImage = document.querySelector('.image-popup');
const imageElement = popupOpenedImage.querySelector('.popup__image');
const textElement = popupOpenedImage.querySelector('.popup__figaption');

import { removeCard, addLikeToCard, removeLikeOfCard } from "./api";
import { nameOfUser } from ".";

function deleteCard(button) {
    button.closest('.place').remove();
}

function toggleButtonOfLike(number, button, idCard) {
    if (!button.classList.contains('place__button-like_type_active')) {
        addLikeToCard(idCard)
            .then((data) => {
                button.classList.add('place__button-like_type_active')
                number.textContent = data.likes.length
            })
            .catch((err) => {
                console.log(`Ошибка при попытке поставить лайк: ${err.status} ${err.statusText}`)
            });
    } else {
        removeLikeOfCard(idCard)
            .then((data) => {
                button.classList.remove('place__button-like_type_active');
                number.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(`Ошибка при попытке убрать лайк: ${err.status} ${err.statusText}`)
            });
    }

}

function openImage(image, namePlace, openPopup) {

    imageElement.src = image.src;
    imageElement.alt = namePlace.textContent;
    textElement.textContent = namePlace.textContent;
    openPopup(popupOpenedImage);
}

function checkLike(arr, likebutton) {
    if (arr.some((likes) => {
        return likes._id === localStorage.getItem('userId')
    }
    )) {
        likebutton.classList.add('place__button-like_type_active')
    } else {
        likebutton.classList.remove('place__button-like_type_active')
    }
}

export function createCard(placeName, placeUrl, likes, openPopup, idOfUser, idOfCard, like) {
    const templateAddCard = document.querySelector('#template-place').content;
    const cardAddInProfile = templateAddCard.querySelector('.place').cloneNode(true);

    const imageOfCard = cardAddInProfile.querySelector('.place__image');
    const nameOfPlace = cardAddInProfile.querySelector('.place__title');
    const likeOfCard = cardAddInProfile.querySelector('.place__button-like');
    const buttonDeleteCard = cardAddInProfile.querySelector('.place__trash');
    const numberlikeOfCard = cardAddInProfile.querySelector('.place__like-number')
    imageOfCard.addEventListener('click', () => { openImage(imageOfCard, nameOfPlace, openPopup) });
    likeOfCard.addEventListener('click', () => { toggleButtonOfLike(numberlikeOfCard, likeOfCard, idOfCard) });
    checkLike(like, likeOfCard)

    buttonDeleteCard.addEventListener('click', () => {
         removeCard(idOfCard)
        .then(() => {
            deleteCard(buttonDeleteCard)
        }) })

    if (idOfUser !== localStorage.getItem('userId')) {
        buttonDeleteCard.remove()
    }

    nameOfPlace.textContent = placeName;
    imageOfCard.src = placeUrl;
    numberlikeOfCard.textContent = likes;

    imageOfCard.alt = placeName;

    return cardAddInProfile
}
