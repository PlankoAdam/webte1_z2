import { emptyFieldMessage, setError, setSuccess} from "../util.js";

export { validate, reset };

const lNameInput = document.getElementById('last-name');
const lNameLenDisplay = document.getElementById('l-name-len');

lNameInput.addEventListener('blur', e => validate());
lNameInput.addEventListener('input', e => displayLastNameLength());
validate();

function validate(){
    const lNameVal = lNameInput.value;
    if(!lNameVal){
        setError(lNameInput, emptyFieldMessage);
        return false;
    }
    setSuccess(lNameInput);
    return true;
}

function displayLastNameLength(){
    lNameLenDisplay.innerText = lNameInput.value.length + '/20';
}

function reset(){
    lNameInput.value = '';
    displayLastNameLength();
}