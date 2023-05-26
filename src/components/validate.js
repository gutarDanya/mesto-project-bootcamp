function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__error_active');
};

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__error_active');
    errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((input) =>{
        return !input.validity.valid
    })
};

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__button-submit_disabled');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('form__button-submit_disabled');
        buttonElement.removeAttribute('disabled');
    }
};

function setEventListeners (formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

export function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })
        setEventListeners(form, obj);
    })
}