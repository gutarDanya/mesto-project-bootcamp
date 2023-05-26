export function checkResponse(res) {
    if (res.ok) {
        return res.json()
    } else {
        return Promise.reject(`Ошибка ${res.status}`)
    }
}

export function renderLoading (isLoading, button) {
    if (isLoading) {
        button.textContent = 'сохраниение'
    }
    }