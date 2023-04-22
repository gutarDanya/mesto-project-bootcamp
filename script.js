const popupEditProfile = document.querySelector('.edit-popup');
const popupAddCard = document.querySelector('.add-popup');

const formEditPorfile = popupEditProfile.querySelector('.form');
const formAddPlace = popupAddCard.querySelector('.form');

const buttonOpenEditPopup = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add-button');
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseAddPopup = popupAddCard.querySelector('.popup__button-close');

const inputNameOfUser = popupEditProfile.querySelector('#name');
const inputBioOfUser = popupEditProfile.querySelector('#bio');
const inputNameOfPlace = popupAddCard.querySelector('#place');
const inputLinkOfPlace = popupAddCard.querySelector('#link');

const nameOfUser = document.querySelector('.profile__title');
const bioOfUser = document.querySelector('.profile__bio');

const placesContainer = document.querySelector('.places');

const initialCards = [
    {
        name: 'херуфимы',
        link: 'https://sun9-21.userapi.com/impg/-5A2Bv-Y5dMuH9Zyd4eyy1xNJc8F2_F4P-o7vA/KD1Iw_y2w7o.jpg?size=881x1015&quality=95&sign=cf05db381dcc8776733b03510fee9c2c&type=album'
    },
    {
        name: 'сирафимы',
        link: 'https://sun9-33.userapi.com/impg/9yxIoDC0IeC7Dba6sIE_Mzodzktju0l08FDEBg/TxItI3reB2A.jpg?size=939x1080&quality=95&sign=e7338e86b9e4223c99a816af6b90f311&type=album'
    },
    {
        name: 'ангелы',
        link: 'https://external-preview.redd.it/qEviNrnwkrhvBeqW_c10AmNTWGLFB1AFbQEZl-KZyg0.png?format=pjpg&auto=webp&s=f553cc921ebb6253cfb3e08fe4874d6a6ef87eed'
    },
    {
        name: 'высшее божество',
        link: 'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2016/05/20/1331795954995_2/%D1%80%D0%B0%D0%B9%D0%B0%D0%BD-%D0%B3%D0%BE%D1%81%D0%BB%D0%B8%D0%BD%D0%B3.jpg'
    },
    {
        name: 'мраморное здание',
        link: 'https://vk.com/photo486152365_457244963?rev=1'
    },
    {
        name: 'мраморное здание',
        link: 'https://sun9-13.userapi.com/impg/KO49MEVDXs5ZReoAoVihvT1XLmkeY-ZMjSvqxg/XqiUKk_7UOQ.jpg?size=736x1128&quality=95&sign=e9d61642373fe125f315e848ec8de487&type=album'
    }
]

function openPopup(popup) {
    popup.classList.add('popup_active');
}

function closePopup(popup) {
    popup.classList.remove('popup_active')
}

function createCard(placeName, placeUrl) {
    const templateAddCard = document.querySelector('#template-place').content;
    const cardAddInProfile = templateAddCard.querySelector('.place').cloneNode(true);

    const imageOfCard = cardAddInProfile.querySelector('.place__image');
    const nameOfPlace = cardAddInProfile.querySelector('.place__title');
    const likeOfCard = cardAddInProfile.querySelector('.place__button-like');

    function toggleLike() {
        likeOfCard.classList.toggle('place__button-like_type_active');
    };
    likeOfCard.addEventListener('click', toggleLike);


    nameOfPlace.textContent = placeName;
    imageOfCard.src = placeUrl;

    imageOfCard.alt = placeName;
    placesContainer.prepend(cardAddInProfile);

    return placesContainer
}

function submitEditForm(evt) {
    evt.preventDefault()
    nameOfUser.textContent = inputNameOfUser.value;
    bioOfUser.textContent = inputBioOfUser.value;
    inputNameOfUser.placeholder = nameOfUser.textContent;
    inputBioOfUser.placeholder = bioOfUser.textContent;
    inputNameOfUser.value = '';
    inputBioOfUser.value = '';
}

function submitAddForm(evt) {
    evt.preventDefault();
    createCard(inputNameOfPlace.value, inputLinkOfPlace.value);
}

buttonOpenEditPopup.addEventListener('click', () => { openPopup(popupEditProfile) });
buttonCloseEditPopup.addEventListener('click', () => { closePopup(popupEditProfile) });

buttonOpenAddPopup.addEventListener('click', () => { openPopup(popupAddCard) });
buttonCloseAddPopup.addEventListener('click', () => { closePopup(popupAddCard) });

formEditPorfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddForm);

initialCards.forEach((item) => {
    createCard(item.name, item.link);
});

