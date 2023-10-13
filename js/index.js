const form = document.getElementById('form');
const fNameInput = document.getElementById('first-name');
const lNameInput = document.getElementById('last-name');
const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');

const fNameLenDisplay = document.getElementById('f-name-len');
const lNameLenDisplay = document.getElementById('l-name-len');

const emptyFieldMessage = 'This field is required!'

form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
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

function validateFirstName(){
    const fNameVal = fNameInput.value;
    if(!fNameVal){
        setError(fNameInput, emptyFieldMessage);
        return;
    }
    setSuccess(fNameInput);
}

function displayFirstNameLength(){
    fNameLenDisplay.innerText = fNameInput.value.length + '/20';
}

function validateLastName(){
    const lNameVal = lNameInput.value;
    if(!lNameVal){
        setError(lNameInput, emptyFieldMessage);
        return;
    }
    setSuccess(lNameInput);
}

function displayLastNameLength(){
    lNameLenDisplay.innerText = lNameInput.value.length + '/20';
}

function validateDob(){
    const dobVal = dobInput.value;
    if(!dobVal){
        setError(dobInput, emptyFieldMessage);
        return;
    }

    const ageVal = ageInput.value;
    ageInput.value = getAge(dobVal);
    setSuccess(dobInput);
    setSuccess(ageInput);
}

function validateAge(){
    var ageVal = ageInput.value;
    if(!ageVal){
        setError(ageInput, emptyFieldMessage);
        return;
    }

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

function validateEmail(){
    var emailVal = emailInput.value;
    if(!emailVal){
        setError(emailInput, emptyFieldMessage);
        return;
    }

    let regex = /^[a-z]{3,20}@[a-z]{1,}.[a-z]{2,4}$/i;
    if(!regex.test(emailVal)){
        setError(emailInput, 'Not a valid e-mail!');
    } else {
        setSuccess(emailInput);
    }
}

function validateForm(){
    validateFirstName();
    validateLastName();
    validateDob();
    validateAge();
    validateEmail();
}

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

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.dropdown-menu');
    const options = dropdown.querySelectorAll('.dropdown-menu li');
    const selected = dropdown.querySelector('.selected');

    select.addEventListener('click', () => {
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('dropdown-menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            caret.classList.remove('caret-rotate');
            menu.classList.remove('dropdown-menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');
        });
    });
});
