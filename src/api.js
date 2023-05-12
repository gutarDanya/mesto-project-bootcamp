const myToken = '69d222fd-0392-481b-900a-15a7a7efdad5';
const myUrl = 'https://mesto.nomoreparties.co/v1/wbf-cohort-8';

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


