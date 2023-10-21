
let formIsValid = true;

const form = document.getElementById('form');
const fNameInput = document.getElementById('first-name');
const lNameInput = document.getElementById('last-name');
const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');

const fNameLenDisplay = document.getElementById('f-name-len');
const lNameLenDisplay = document.getElementById('l-name-len');

const genderSelector = document.getElementById('gender-selector');
const otherGenderInput = document.getElementById('other-gender-input');

const selCat = document.getElementById('sel-cat');
const selSubCat = document.getElementById('sel-sub-cat');
const selModel = document.getElementById('sel-model');
const totalLabel = document.getElementById('total-label');
const checkboxes = [
    {
        element: document.getElementById('opt1'),
        label: document.getElementById('l-opt1'),
        name:"+3 roky záruka",
        price:30
    },
    {
        element: document.getElementById('opt2'),
        label: document.getElementById('l-opt2'),
        name:"Okamžitá výmena",
        price:15
    },
    {
        element: document.getElementById('opt3'),
        label: document.getElementById('l-opt3'),
        name:"Poistenie zásielky",
        price:10
    },
    {
        element: document.getElementById('opt-other'),
        label: document.getElementById('l-opt-other'),
        name:"Poznámka pre kuriéra",
        price:0
    }
];
const otherCheckboxInput = document.getElementById('opt-other-txtbox');
let total = 0;

const emptyFieldMessage = 'Prosím, vyplňte políčko!';


form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
});

form.addEventListener('reset', e => resetForm());

function resetForm(){
    var formElements = document.getElementsByClassName('form-element');
    for(let i = 0; i < formElements.length; i++){
        setDefault(formElements[i]);
    }
    resetSelects();
    resetCheckboxes();
    updateTotal();
    document.getElementById('other-gender').checked = false;
    toggleOtherGenderInput();
    fNameInput.value = '';
    displayFirstNameLength();
    lNameInput.value = '';
    displayLastNameLength();
    formIsValid = true;
}

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

function displayFirstNameLength(){
    fNameLenDisplay.innerText = fNameInput.value.length + '/20';
}

function displayLastNameLength(){
    lNameLenDisplay.innerText = lNameInput.value.length + '/20';
}

function sendForm(){
    console.log('valid form');
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

function checkboxesInit(){
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].label.innerHTML = checkboxes[i].name;
    }
}

function resetCheckboxes(){
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].element.checked = false;
    }
    toggleOtherInput();
}

function toggleOtherInput(){
    const otherCheckbox = document.getElementById('opt-other');
    if(otherCheckbox.checked) otherCheckboxInput.style.display = 'block';
    else otherCheckboxInput.style.display = 'none';
}

function toggleOtherGenderInput(){
    const otherGenderRadio = document.getElementById('other-gender');
    if(otherGenderRadio.checked) otherGenderInput.style.display = 'block';
    else otherGenderInput.style.display = 'none';
}

checkboxesInit();
resetForm();