import { emptyFieldMessage, setError, setSuccess } from "../util.js";

export { validate };

const countryCodeSelector = document.getElementById('sel-country-code');
const localPhoneNumberInput = document.getElementById('local-number-input');

localPhoneNumberInput.addEventListener('blur', e => validate());

function validate(){
    if(localPhoneNumberInput.value == ''){
        setError(localPhoneNumberInput.parentElement, emptyFieldMessage);
        return false;
    }
    setSuccess(localPhoneNumberInput.parentElement);
    return true;
}