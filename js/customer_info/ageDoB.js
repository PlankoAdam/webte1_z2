import { emptyFieldMessage, setError, setSuccess } from "../util.js";

export {validate};

const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');

dobInput.addEventListener('blur', validateDob);
dobInput.addEventListener('change', validateDob);
ageInput.addEventListener('blur', validateAge);
ageInput.addEventListener('change', validateAge);

function validate(){
    if(validateDob() & validateAge()) return true;
    return false;
}

function validateDob(){
    const dobVal = dobInput.value;
    if(!dobVal){
        setError(dobInput, emptyFieldMessage);
        return false;
    }

    if(!ageInput.value){
        ageInput.value = getAge(dobVal);
        setSuccess(dobInput);
        setSuccess(ageInput);
        return true;
    }
    validateAge();
    return false;
}

function validateAge(){
    let ageVal = ageInput.value;
    if(!ageVal){
        if(dobInput.value){
            ageInput.value = getAge(dobInput.value);
            setSuccess(dobInput);
            setSuccess(ageInput);
            return true;
        }
        setError(ageInput, emptyFieldMessage);
        return false;
    }

    if(ageVal > 99) ageInput.value = 99;
    else if(ageVal < 0) ageInput.value = 0;

    ageVal = ageInput.value;
    if(!dobInput.value){
        setError(dobInput, emptyFieldMessage);
        return false;
    }
    else if(ageVal != getAge(dobInput.value)){
        const message = 'Dátum narodenia a vek nezhodujú!';
        setError(dobInput, message);
        setError(ageInput, message);
        return false;
    }
    else{
        setSuccess(dobInput);
        setSuccess(ageInput);
        return true;
    }
}

function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}