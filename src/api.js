const myToken = '69d222fd-0392-481b-900a-15a7a7efdad5';
const myUrl = 'https://mesto.nomoreparties.co/v1/wbf-cohort-8';

import autoprefixer from "autoprefixer";
import { createCard, myID } from "./card";
import { closePopup, openPopup, } from "./modal";
import { placesContainer } from ".";

export function changeNameOfUser(name, about, avatar) {
    return fetch(`${myUrl}/users/me`, {
        headers: {
            authorization: myToken
        }
    })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            name.textContent = data.name;
            about.textContent = data.about;
            avatar.src = data.avatar
        })
        .catch((err) => {
            name.textContent = `Ошибка загрузки имени:${err.status}${err.statustext}, сорян`;
            about.textContent = `Ошибка загрузки биографии:${err.status}${err.statustext}, сегодня без био`
            avatar.src = 'https://thumbs.dreamstime.com/z/error-sign-error-message-icon-logo-dark-background-white-error-sign-error-message-icon-logo-dark-background-133331672.jpg'
        })
}

export function loadStartCards(container, openPopup) {
    return fetch(`${myUrl}/cards`, {
        headers: {
            authorization: myToken
        }
    })
        .then(res => res.json())
        .then((cardsValue) => {
            cardsValue.forEach((card) => {
                container.prepend(createCard(card.name, card.link, card.likes.length, openPopup, card.owner._id, card._id, card.likes))
            })
        })
        .catch((err) => {
            console.log(`Не получилось загрузить карточки, ошибка:${err.status}${err.statustext}`)
        })
}

export function SendNewProfile(button, name, bio, nameOfUser, bioOfUser, inputNameOfUser, inputBioOfUser, popup) {
    fetch(`${myUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${bio}`
        })
    })
    .then(res => res.json())
    .then((data) => {
        nameOfUser.textContent = data.name;
        bioOfUser.textContent = data.about;
    
        closePopup(popup);
    
        inputNameOfUser = nameOfUser.textContent;
        inputBioOfUser = bioOfUser.textContent;
    })
        .catch((err) => {
            console.log(`не получилось отправить данные, ошибка: ${err.status}${err.statustext}`)
        })
        .finally(() => {
            button.textContent = 'Сохранение'
        })
}

export function sendNewCard(place, picture, popup, button) {
    fetch(`${myUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: myToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: place,
            link: picture,
            owner: {
                id: myID
            }
        })
    })
    .then(res => res.json())
    .then((card) => {
        placesContainer.append(createCard(card.name, card.link, card.likes.length, openPopup, card.owner._id, card._id, card.likes))
        closePopup(popup)
    })
    .catch((err) => {
        console.log(`Ошибка при сохранении карточки: ${err.status}${err.statusText}`)
    })
    .finally(() => {
        button.textContent = "Сохранение"
    })
}

export function removeCard(idCard) {
    return fetch(`${myUrl}/cards/${idCard}`, {
        method: "DELETE",
        headers: {
            authorization: myToken
        }
    })
}

function addLikeToCard(idCard) {
    return fetch(`${myUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: {
            authorization: myToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        _id: myID
        })
    })
    .catch((err) => {
        console.log(`Ошибка при попытке поставить лайк: ${err.status} ${err.statusText}`)
    })
}

function removeLikeOfCard(idCard) {
    return fetch(`${myUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: myToken
        }
    })
    .catch((err) => {
        console.log(`Ошибка при попытке убрать лайк: ${err.status} ${err.statusText}`)
    })
}

export function toggleButtonOfLike (number ,button, idCard) {
    if (!button.classList.contains('place__button-like_type_active')) {
        button.classList.add('place__button-like_type_active')
        addLikeToCard(idCard)
        number.textContent = parseInt(number.textContent) + 1
    } else {
        button.classList.remove('place__button-like_type_active')
        removeLikeOfCard(idCard)
        number.textContent = number.textContent - 1;
    }

}

export function sendAvatarOfUser (button, urlOfAvatar, avatar, popup) {
    return fetch(`${myUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: myToken
        },
        body: JSON.stringify({
        avatar: urlOfAvatar
        })
    })
    .then(res => res.json())
    .then((data) => {
        avatar.src = data.avatar;
        closePopup(popup)
    })
    .catch((err) => {
        console.log(`Ошибка при поптыке изменить аватар: ${err.status} ${err.statusText}`)
    })
    .finally(() => {
        renderLoading(true, button)
    })
}

function renderLoading (isLoading, button) {
if (isLoading) {
    button.textContent = 'сохраниение'
}
}


fetch(`${myUrl}/cards`, {
    headers: {
        authorization: myToken
    }
})
.then(res => res.json())
.then((cards) => {
    console.log(cards)
})