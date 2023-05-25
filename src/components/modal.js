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

export function closePopupKey() {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && document.querySelector('.popup_active')) {
            closePopup(document.querySelector('.popup_active'))
        }
    })
}

export function openPopup(popup) {
    popup.classList.add('popup_active');
}

export function closePopup(popup) {
    popup.classList.remove('popup_active')
}