const config = {
    headers: '69d222fd-0392-481b-900a-15a7a7efdad5',
    baseURL: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8'
};

import autoprefixer from "autoprefixer";
import { createCard, myID } from "./card";
import { closePopup, openPopup, } from "./modal";
import { checkResponse } from "./utils";

export function getIdOfUser () {
    return fetch(`${config.baseURL}/users/me`, {
        headers: {
            authorization: config.headers
        }
    })
    .then(checkResponse)
    .then((data) => {
        return data._id
    })
}

export function startNameOfUser() {
    return fetch(`${config.baseURL}/users/me`, {
        headers: {
            authorization: config.headers
        }
    })
        .then(checkResponse)
}

export function loadStartCards() {
    return fetch(`${config.baseURL}/cards`, {
        headers: {
            authorization: config.headers
        }
    })
        .then(checkResponse)

}

export function sendNewProfile(name, bio) {
    return fetch(`${config.baseURL}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: config.headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            about: `${bio}`
        })
    })
    .then(checkResponse)
}

export function sendNewCard(place, picture) {
    return fetch(`${config.baseURL}/cards`, {
        method: 'POST',
        headers: {
            authorization: config.headers,
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
    .then(checkResponse)
}

export function removeCard(idCard) {
    return fetch(`${config.baseURL}/cards/${idCard}`, {
        method: "DELETE",
        headers: {
            authorization: config.headers
        }
    })
}

function addLikeToCard(idCard) {
    return fetch(`${config.baseURL}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: {
            authorization: config.headers,
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
    return fetch(`${config.baseURL}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: {
            authorization: config.headers
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

export function sendAvatarOfUser (urlOfAvatar) {
    return fetch(`${config.baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: config.headers
        },
        body: JSON.stringify({
        avatar: urlOfAvatar
        })
    })
    .then(checkResponse)
}



// fetch(`${config.baseURL}/cards`, {
//     headers: {
//         authorization: config.headers
//     }
// })
// .then(checkResponse)
// .then((cards) => {
//     console.log(cards)
// })