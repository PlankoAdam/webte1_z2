const form = document.getElementById('form');
const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');

form.addEventListener('submit', e => {
    e.preventDefault();
})

form.addEventListener('reset', e => {
    var formElements = document.getElementsByClassName('form-element');
    for(var i = 0; i < formElements.length; i++){
        setDefault(formElements[i]);
    }
})

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function validateAge(){
    var ageVal = ageInput.value;
    if(ageVal > 99) ageInput.value = 99;
    else if(ageVal < 0) ageInput.value = 0;

    ageVal = ageInput.value;
    if(ageVal == null || ageVal == '') return;
    if(!dobInput.value){
        setError(dobInput, 'Errooooo');
    }
    else if(ageVal != getAge(dobInput.value)){
        const message = 'Error!';
        setError(dobInput, message);
        setError(ageInput, message);
    }
    else{
        setSuccess(dobInput);
        setSuccess(ageInput);
    }
}

function validateDob(){
    const dobVal = dobInput.value;
    const ageVal = ageInput.value;
    if(ageVal == null || ageVal == '') ageInput.value = getAge(dobVal);
    else if(ageVal != getAge(dobVal)){
        const message = 'Error!';
        setError(dobInput, message);
        setError(ageInput, message);
    }
    else {
        setSuccess(dobInput);
        setSuccess(ageInput);
    }
}

function setError(element, message){
    const formElement = element.parentElement;
    const errorDisplay = formElement.querySelector('.error');

    errorDisplay.innerText = message;
    formElement.classList.add('error');
    formElement.classList.remove('success');
}

function setSuccess(element){
    const formElement = element.parentElement;
    const errorDisplay = formElement.querySelector('.error');

    errorDisplay.innerText = '';
    formElement.classList.add('success');
    formElement.classList.remove('error');
}

function setDefault(element){
    element.classList.remove('error');
    element.classList.remove('success');

    const errorDisplay = element.querySelector('.error');
    if(errorDisplay != null) errorDisplay.innerText = '';
}