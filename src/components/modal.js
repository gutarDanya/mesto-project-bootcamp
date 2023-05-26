const popupList = Array.from(document.querySelectorAll('.popup'));


export function clickOverlay(closePopup) {
    popupList.forEach((popup) => {
        popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_active')) {
                closePopup(popup)
            }
        })
    })
}

export function closePopupKey(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active');
        closePopup(openedPopup)
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closePopupKey)
}

export function closePopup(popup) {
    popup.classList.remove('popup_active')
    document.removeEventListener('keydown', closePopupKey)
}