import { emptyFieldMessage, setError, setSuccess} from "../util.js";

export { validate };

const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', validate);

function validate(){
    let emailVal = emailInput.value;
    if(!emailVal){
        setError(emailInput, emptyFieldMessage);
        return false;
    }

    const regex1 = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,4}$/i;
    const regex2 = /^.{3,}@.*$/i;
    if(regex1.test(emailVal) & regex2.test(emailVal)){
        setSuccess(emailInput);
        return true;
    } else {
        setError(emailInput, 'Nevalidný formát!');
        return false;
    }
}