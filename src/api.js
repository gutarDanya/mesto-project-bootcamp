const myToken = '69d222fd-0392-481b-900a-15a7a7efdad5';
const myUrl = 'https://mesto.nomoreparties.co/v1/wbf-cohort-8';

import autoprefixer from "autoprefixer";
import { createCard } from "./card";

export function changeNameOfUser (name, about, avatar) {
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

export function loadStartCards (container, openPopup) {
return fetch(`${myUrl}/cards`, {
    headers: {
        authorization: myToken
    }
})
.then(res => res.json())
.then((cardsValue) => {
 cardsValue.forEach((card) => {
    container.prepend(createCard(card.name, card.link, openPopup))
 })
})
.catch((err) => {
    console.log(`Не получилось загрузить карточки, ошибка:${err.status}${err.statustext}`)
})
}

export function SendNewProfile (name, bio) {
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
    .catch((err) => {
        console.log(`не получилось отправить данные, ошибка: ${err.status}${err.statustext}`)
    })
}

export function TestObject () {
    return fetch(`${myUrl}/users/me`, {
        headers: {
            authorization: myToken
        }
    })
    .then(res => res.json())
    .then((data) => {
        console.log(data)
    })
}
