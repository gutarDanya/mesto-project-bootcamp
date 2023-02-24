let editButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.edit-form');
let editFormCloseButton = document.querySelector('.form__close-button');


function openEditForm() {
    editForm.classList.add('edit-form_active')
}

function closeEditForm() {
    editForm.classList.remove('edit-form_active')
}

editButton.addEventListener('click', openEditForm);
editFormCloseButton.addEventListener('click', closeEditForm);