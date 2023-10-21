import { emptyFieldMessage, setError, setSuccess} from "../util.js";

export { validate, reset };

const fNameInput = document.getElementById('first-name');
const fNameLenDisplay = document.getElementById('f-name-len');

fNameInput.addEventListener('blur', e => validate());
fNameInput.addEventListener('input', e => displayFirstNameLength());
validate();

function validate(){
    const fNameVal = fNameInput.value;
    if(!fNameVal){
        setError(fNameInput, emptyFieldMessage);
        return false;
    }
    setSuccess(fNameInput);
    return true;
}

function displayFirstNameLength(){
    fNameLenDisplay.innerText = fNameInput.value.length + '/20';
}

function reset(){
    fNameInput.value = '';
    displayFirstNameLength();
}