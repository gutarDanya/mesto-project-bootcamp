function showInputError (formElement, inputElement, errorMessage, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inactieErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

function hideInputError (formElement, inputElement, obj) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inactieErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, obj) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some((input) =>{
        return !input.validity.valid
    })
};

function toggleButtonState (inputList, buttonElement, obj) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

function setEventListeners (formElement, obj) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input, obj);
            toggleButtonState(inputList, buttonElement, obj)
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