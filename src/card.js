export const popupOpenedImage = document.querySelector('.image-popup');
const imageElement = popupOpenedImage.querySelector('.popup__image');
const textElement = popupOpenedImage.querySelector('.popup__figaption');

export function createCard(placeName, placeUrl, likes, openPopup) {
    const templateAddCard = document.querySelector('#template-place').content;
    const cardAddInProfile = templateAddCard.querySelector('.place').cloneNode(true);

    const imageOfCard = cardAddInProfile.querySelector('.place__image');
    const nameOfPlace = cardAddInProfile.querySelector('.place__title');
    const likeOfCard = cardAddInProfile.querySelector('.place__button-like');
    const buttonDeleteCard = cardAddInProfile.querySelector('.place__trash');
    const numberlikeOfCard = cardAddInProfile.querySelector('.place__like-number')

    function toggleLike() {
        likeOfCard.classList.toggle('place__button-like_type_active');
    };
    likeOfCard.addEventListener('click', toggleLike);

    function deleteCard() {
        buttonDeleteCard.closest('.place').remove();
    }

    function openImage() {

        imageElement.src = imageOfCard.src;
        imageElement.alt = nameOfPlace.textContent;
        textElement.textContent = nameOfPlace.textContent;
        openPopup(popupOpenedImage);
    }

    imageOfCard.addEventListener('click', openImage);

    buttonDeleteCard.addEventListener('click', deleteCard);

    nameOfPlace.textContent = placeName;
    imageOfCard.src = placeUrl;
    numberlikeOfCard.textContent = likes;

    imageOfCard.alt = placeName;

    return cardAddInProfile
}