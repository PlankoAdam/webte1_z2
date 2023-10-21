import * as fName from "./customer_info/firstName.js";
import * as lName from "./customer_info/lastName.js";
import * as ageDoB from "./customer_info/ageDoB.js";
import * as email from "./customer_info/email.js";
import * as phone from "./customer_info/phoneNumber.js";
import * as gender from "./customer_info/gender.js";

import * as cart from "./cart/cart.js";

import { setDefault } from "./util.js";

const form = document.getElementById('form');

resetForm();

form.addEventListener('submit', e => {
    e.preventDefault();
    sendForm();
});

form.addEventListener('reset', resetForm);

function resetForm(){
    let formElements = document.getElementsByClassName('form-element');
    for(let i = 0; i < formElements.length; i++){
        setDefault(formElements[i]);
    }
    cart.reset();
    gender.reset();
    fName.reset();
    lName.reset();
}

function sendForm(){
    if(!validateForm()){
        return;
    }
    console.log('Form submitted!');
}

function validateForm(){
    let isValid = true;
    const inputs = [
        fName,
        lName,
        ageDoB,
        email,
        phone,
        gender
    ];
    for(let i = 0; i < inputs.length; i++){
        if(!inputs[i].validate()){
            isValid = false;
        }
    }
    return isValid;
}