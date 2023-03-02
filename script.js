//МОДАЛЬНЫЕ ОКНА
const modalEditProfile = document.querySelector('.modal-window_place_edit-form');
const modalAddPlace = document.querySelector('.modal-window_place_add-form');
const modalImageActive = document.querySelector('.modal-window_place_image');

//ФОРМЫ
const formEditProfile = modalEditProfile.querySelector('.form');
const formAddPlace = modalAddPlace.querySelector('.form');

//СЕКЦИЯ ЭЛЕМЕНТЫ И ЕГО СОДЕРЖИМОЕ
const elementsSection = document.querySelector('.elements');
const elementImageOfOpenModalWindow = modalImageActive.querySelector('.image-popup__image');
const elementTextOfOpenModalWindow = modalImageActive.querySelector('.image-popup__text');

//КОНСТАНТЫ КНОПОК
const buttonOpenEditForm = document.querySelector('.profile__edit-button');
const buttonOpentAddForm = document.querySelector('.profile__add-button');
const buttonCloseEditForm = modalEditProfile.querySelector('.form__close-button');
const buttonCloseAddForm = modalAddPlace.querySelector('.form__close-button');
const buttonCloseImageActive = modalImageActive.querySelector('.form__close-button');
const buttonLikePost = elementsSection.querySelector('.element__like');

//ИНПУТЫ
const inputNameOfUser = modalEditProfile.querySelector('.form__input_type_name');
const inputBioOfUser = modalEditProfile.querySelector('.form__input_type_bio');
const inputPostInfo = modalAddPlace.querySelector('.form__input_type_place');
const inputPostImage = modalAddPlace.querySelector('.form__input_type_image-url');

//ЭЛЕМЕНТЫ ЭДИТ ФОРМЫ
let nameOfUser = document.querySelector('.profile__title');
let bioOfUser = document.querySelector('.profile__text');
const initialCardList = [{
    name: 'Новороссийск',
    link: 'https://clck.ru/33erea'
},
{
    name: 'Долина Йосемити',
    link: 'https://clck.ru/33erhw',
},
{
    name: 'Большая голубая дыра',
    link: 'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2018/06/31-Great_Blue_Hole-e1528959819181.jpg',
},
{
    name: 'Салар де Юни',
    link: 'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2018/06/5-Salar_de_Uyuni-e1528946029666.jpg',
},
{
    name: 'прованс',
    link: 'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2018/06/27-Provence-e1528957059108.jpg',
},
{
    name: 'Бухта Навагио',
    link: 'https://www.tripzaza.com/ru/destinations/wp-content/uploads/2018/06/24-Navagio_Beach-e1528956679198.jpg',
},
]

function openPopup (nameOfPopup) {
    nameOfPopup.classList.add('modal-window_active');
}

function closePopup (nameOfPopup) {
    nameOfPopup.classList.remove('modal-window_active');
}

//колбек для формы создания карточки
function submitAddForm (e) {
    e.preventDefault();

    const placeContainer = document.createElement('div');
    placeContainer.classList.add('element');

    const trash = document.createElement('button');
    trash.classList.add('element__delete-place');
    trash.setAttribute('type','button');

    trash.addEventListener('click', function (evt) {
        const elementToDelete = trash.closest('.element');
        elementToDelete.remove();
    })

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('element__info');

    const nameOfPlace = document.createElement('h2');
    nameOfPlace.classList.add('element__place');
    nameOfPlace.textContent = inputPostInfo.value;

    const buttonLikePlace = document.createElement('button');
    buttonLikePlace.classList.add('element__like');
    buttonLikePlace.setAttribute('type', 'button');

    buttonLikePlace.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    
    infoContainer.append(nameOfPlace, buttonLikePlace);

    const imageElement = document.createElement('img');
    imageElement.src = inputPostImage.value;
    imageElement.classList.add('element__image');


    placeContainer.append(imageElement, trash, infoContainer);

    elementsSection.prepend(placeContainer);

    imageElement.addEventListener('click', () => {
        elementImageOfOpenModalWindow.src = imageElement.src;
        elementImageOfOpenModalWindow.alt = nameOfPlace.textContent;
        elementTextOfOpenModalWindow.textContent = nameOfPlace.textContent;
        openPopup(modalImageActive)
    });
};

//ИЗМЕНЕНИЕ ПРОФИЛЯ
function submitEditForm(e) {
    e.preventDefault();
    nameOfUser.textContent = inputNameOfUser.value;
    bioOfUser.textContent = inputBioOfUser.value;
}

buttonOpenEditForm.addEventListener('click', () => openPopup(modalEditProfile));
buttonCloseEditForm.addEventListener('click', () => closePopup(modalEditProfile));

formEditProfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);

buttonOpentAddForm.addEventListener('click', () => openPopup(modalAddPlace));
buttonCloseAddForm.addEventListener('click', () => closePopup(modalAddPlace));

    for (let i = 0; i < initialCardList.length; i ++) {
        const placeContainer = document.createElement('div');
    placeContainer.classList.add('element');

    const trash = document.createElement('button');
    trash.classList.add('element__delete-place');
    trash.setAttribute('type','button');

    trash.addEventListener('click', function (evt) {
        const elementToDelete = trash.closest('.element');
        elementToDelete.remove();
    });

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('element__info');

    const nameOfPlace = document.createElement('h2');
    nameOfPlace.classList.add('element__place');
    nameOfPlace.textContent = initialCardList[i].name;

    const buttonLikePlace = document.createElement('button');
    buttonLikePlace.classList.add('element__like');
    buttonLikePlace.setAttribute('type', 'button');

    buttonLikePlace.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    
    infoContainer.append(nameOfPlace, buttonLikePlace);

    const imageElement = document.createElement('img');
    imageElement.src = initialCardList[i].link;
    imageElement.classList.add('element__image');

    buttonCloseImageActive.addEventListener('click', () => closePopup(modalImageActive));

    placeContainer.append(imageElement, trash, infoContainer);

    elementsSection.prepend(placeContainer);

    imageElement.addEventListener('click', () => {
        elementImageOfOpenModalWindow.src = imageElement.src;
        elementImageOfOpenModalWindow.alt = nameOfPlace.textContent;
        elementTextOfOpenModalWindow.textContent = nameOfPlace.textContent;
        openPopup(modalImageActive)
    });
    };

