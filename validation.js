

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('error-message');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('error-message');
    errorElement.textContent ='';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.vlaid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__save-button_disabled');
    } else {
        buttonElement.classList.remove('form__save-button_disabled');
    };
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__save-button');

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement);
        });
    });
};

export const enableValidation = () => {
    const formListPsevdo = document.querySelectorAll('.form');
    const formList = Array.from(formListPsevdo);
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
         formList.forEach((form) => {
            setEventListeners(form);
         });
    });
};