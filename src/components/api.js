const config = {
    headers: {
        authorization: '69d222fd-0392-481b-900a-15a7a7efdad5',
        'Content-Type': 'application/json',
    },
    baseUrl: 'https://mesto.nomoreparties.co/v1/wbf-cohort-8'
};

import autoprefixer from "autoprefixer";
import { userId } from ".";

import { checkResponse } from "./utils";

export function startNameOfUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkResponse)
}

export function loadStartCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkResponse)

}

export function sendNewProfile(name, bio) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${bio}`
        })
    })
        .then(checkResponse)
}

export function sendNewCard(place, picture) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: place,
            link: picture,
            owner: {
                id: userId
            }
        })
    })
        .then(checkResponse)
}

export function removeCard(idCard) {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: "DELETE",
        headers: config.headers
    })
}

export function addLikeToCard(idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers,
        body: JSON.stringify({
            _id: userId
        })
    })
        .then(checkResponse)
}

export function removeLikeOfCard(idCard) {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkResponse)
}


export function sendAvatarOfUser(urlOfAvatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: urlOfAvatar
        })
    })
        .then(checkResponse)
}



// fetch(`${config.baseUrl}/cards`, {
//     headers: {
//         authorization: config.headers
//     }
// })
// .then(checkResponse)
// .then((cards) => {
//     console.log(cards)
// })