
const form = document.getElementById('form');
const fNameInput = document.getElementById('first-name');
const lNameInput = document.getElementById('last-name');
const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');

const fNameLenDisplay = document.getElementById('f-name-len');
const lNameLenDisplay = document.getElementById('l-name-len');

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

const emptyFieldMessage = 'This field is required!';


form.addEventListener('submit', e => {
    e.preventDefault();
    validateForm();
})

form.addEventListener('reset', e => resetForm());

function resetForm(){
    var formElements = document.getElementsByClassName('form-element');
    for(var i = 0; i < formElements.length; i++){
        setDefault(formElements[i]);
    }
    resetSelects();
    resetCheckboxes();
    updateTotal();
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

function selInit(){
    categories.forEach((cat) => {
        selCat.add(new Option(cat.name, cat.name));
    });
}

function updateSelSubCat(){
    removeOptions(selModel);
    removeOptions(selSubCat);
    if(getCurrentCat() != null){
        getCurrentCat().subCategories.forEach(item => {
            selSubCat.add(new Option(item.name, item.name));
        });
    }
    updateSelModel();
}

function updateSelModel(){
    removeOptions(selModel);
    if(getCurrentSubCat() != null){
        getCurrentSubCat().products.forEach(item => {
            selModel.add(new Option(item.name, item.name));
        });
    }
}

function updateTotal(){
    if(selModel.value == 'choose'){
        selectedModel = null;
        total = 0;
    }else{
        const selectedModel = getCurrentSubCat().products.filter(obj => {
            return obj.name == selModel.value;
        })[0];
        total = selectedModel.price;
    }

    for(i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].element.checked){
            total += checkboxes[i].price;
        }
    }

    console.log(selectedModel);
    totalLabel.innerHTML = "Total: " + total;
}

function getCurrentCat(){
    if(selCat.value == 'choose') return null;
    return categories.filter(obj => {
        return obj.name == selCat.value;
    })[0];
}

function getCurrentSubCat(){
    if(selSubCat.value == 'choose') return null;
    return getCurrentCat().subCategories.filter(obj => {
        return obj.name == selSubCat.value;
    })[0];
}

function removeOptions(selObj){
    for(opt in selObj.options){
        selObj.remove(opt);
    }
    selObj.add(new Option("Choose one", 'choose'));
    updateTotal();
}

function resetSelects(){
    removeOptions(selModel);
    removeOptions(selSubCat);
    removeOptions(selCat);
    selInit();
}

function checkboxesInit(){
    for(i = 0; i < checkboxes.length; i++){
        checkboxes[i].label.innerHTML = checkboxes[i].name;
    }
}

function resetCheckboxes(){
    for(i = 0; i < checkboxes.length; i++){
        checkboxes[i].element.checked = false;
    }
    toggleOtherInput();
}

function toggleOtherInput(){
    const otherCheckbox = document.getElementById('opt-other');
    if(otherCheckbox.checked) otherCheckboxInput.style.display = 'block';
    else otherCheckboxInput.style.display = 'none';
}

checkboxesInit();
resetForm();