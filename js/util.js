export { emptyFieldMessage, setError, setSuccess, setDefault };

const emptyFieldMessage = 'Prosím, vyplňte políčko!';

function setError(element, message){
    const formElement = element.parentElement;
    const errorDisplay = formElement.querySelector('.error-text');

    errorDisplay.innerText = message;
    formElement.classList.add('error');
    formElement.classList.remove('success');
}

function setSuccess(element){
    const formElement = element.parentElement;
    const errorDisplay = formElement.querySelector('.error-text');

    errorDisplay.innerText = '';
    formElement.classList.add('success');
    formElement.classList.remove('error');
}

function setDefault(element){
    element.classList.remove('error');
    element.classList.remove('success');

    const errorDisplay = element.querySelector('.error-text');
    if(errorDisplay != null) errorDisplay.innerText = '';
}