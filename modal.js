export const modalWindowList = Array.from(document.querySelectorAll('.modal-window'));
export const modalEditProfile = document.querySelector('.modal-window_place_edit-form');
export const modalAddPlace = document.querySelector('.modal-window_place_add-form');
export const modalImageActive = document.querySelector('.modal-window_place_image');
export const buttonOpenEditForm = document.querySelector('.profile__edit-button');
export const buttonOpentAddForm = document.querySelector('.profile__add-button');
export const buttonCloseEditForm = modalEditProfile.querySelector('.form__close-button');
export const buttonCloseAddForm = modalAddPlace.querySelector('.form__close-button');
export const buttonCloseImageActive = modalImageActive.querySelector('.form__close-button');

export function openPopup (nameModalWindow) {
    nameModalWindow.classList.add('modal-window_active');
    document.addEventListener('keydown', escapePopup)
}

export function closePopup (nameOfModalWindow) {
    nameOfModalWindow.classList.remove('modal-window_active');
}


const escapePopup = (evt) => {
    if (evt.key === 'Escape') {
        closeActivePopup(evt)
    }
}

const closeActivePopup = (evt) => {
    const openedPopup = document.querySelector('.modal-window_active');
    if (openedPopup !== null) {
        evt.preventDefault();
        closePopup(openedPopup)
    };
};

modalWindowList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
 if (evt.target.classList.contains('modal-window_active')) {
    closePopup(popup)
 }
    })
})

export const listenerOfModalWindowList = () => {
buttonOpenEditForm.addEventListener('click', () => openPopup(modalEditProfile));
buttonCloseEditForm.addEventListener('click', () => closePopup(modalEditProfile));

buttonOpentAddForm.addEventListener('click', () => openPopup(modalAddPlace));
buttonCloseAddForm.addEventListener('click', () => closePopup(modalAddPlace));

buttonCloseImageActive.addEventListener('click', () => closePopup(modalImageActive));
}
