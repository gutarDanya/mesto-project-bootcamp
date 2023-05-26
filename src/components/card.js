export const popupOpenedImage = document.querySelector('.image-popup');
const imageElement = popupOpenedImage.querySelector('.popup__image');
const textElement = popupOpenedImage.querySelector('.popup__figaption');
let nameOfUser = document.querySelector('.profile__title');
export const myID = '0372648f2abad853d6418be6'

import { removeCard, addLikeToCard, removeLikeOfCard } from "./api";

function deleteCard(button) {
    button.closest('.place').remove();
}

function toggleButtonOfLike (number ,button, idCard) {
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

function openImage(image, name, openPopup) {

    imageElement.src = image.src;
    imageElement.alt = name.textContent;
    textElement.textContent = name.textContent;
    openPopup(popupOpenedImage);
}

function checkLike(arr, likebutton) {
    if (arr.some((likes) => {
        return likes._id === myID
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
    imageOfCard.addEventListener('click', () => { openImage(imageOfCard, nameOfUser, openPopup) });
    buttonDeleteCard.addEventListener('click', () => { deleteCard(buttonDeleteCard) });
    likeOfCard.addEventListener('click', () => { toggleButtonOfLike(numberlikeOfCard ,likeOfCard, idOfCard) });
    checkLike(like, likeOfCard)

    buttonDeleteCard.addEventListener('click', () => { removeCard(idOfCard) })

    if (idOfUser !== myID) {
        buttonDeleteCard.remove()
    }

    nameOfPlace.textContent = placeName;
    imageOfCard.src = placeUrl;
    numberlikeOfCard.textContent = likes;

    imageOfCard.alt = placeName;

    return cardAddInProfile
}