import * as fName from "./customer_info/firstName.js";
import * as lName from "./customer_info/lastName.js";
import * as ageDoB from "./customer_info/ageDoB.js";
import * as email from "./customer_info/email.js";
import * as phone from "./customer_info/phoneNumber.js";
import * as gender from "./customer_info/gender.js";

import * as cart from "./cart/cart.js";

import { setDefault } from "./util.js";

const form = document.getElementById('form');
const showBtn = document.getElementById('show-name-btn');
const hiddenInput = document.getElementById('hidden-input');
const doneBtn = document.getElementById('done-btn');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close-btn');

modalCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.close();
    clearModal();
});

doneBtn.addEventListener('click', e => {
    e.preventDefault();
    if(!validateForm()){
        console.log('invalid form');
        return;
    }
    console.log('Form submitted!');
    prepareModal();
    modal.showModal();
});

showBtn.addEventListener('click', e => {
    e.preventDefault();
    if(hiddenInput.style.opacity == 0){
        hiddenInput.style.opacity = 1;
    }else{
        hiddenInput.style.opacity = 0;
    }
});

form.addEventListener('reset', resetForm);

resetForm();

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

function validateForm(){
    let isValid = true;
    const inputs = [
        fName,
        lName,
        ageDoB,
        email,
        phone,
        gender,
        cart
    ];
    for(let i = 0; i < inputs.length; i++){
        if(!inputs[i].validate()){
            isValid = false;
            console.log(i);
        }
    }
    return isValid;
}

function prepareModal(){
    document.getElementById('selected-product').innerText = cart.getSelectedProduct().name;
    document.getElementById('selected-product-price').innerText = cart.getSelectedProduct().price + '€';
    const selectedExtrasList = document.getElementById('selected-extras');
    const selectedExtras = cart.getSelectedExtras();
    for(let i = 0; i < selectedExtras.length; i++){
        const li = document.createElement('li');
        selectedExtrasList.appendChild(li);

        const div = document.createElement('div');
        div.classList.add('modal-line');
        li.appendChild(div);

        const name = document.createElement('p');
        name.innerText = selectedExtras[i].name;
        div.appendChild(name);

        const price = document.createElement('p');
        price.innerText = selectedExtras[i].price + '€';
        price.classList.add('price');
        div.appendChild(price);

        if(selectedExtras[i].element.id == 'opt-other'){
            let p = document.createElement('p');
            p.innerText = cart.getOtherOptionText();
            p.id = 'other-extra-text';
            li.appendChild(p);
        }
    }
    document.getElementById('total-modal').innerText = cart.getTotal() + '€';
}

function clearModal(){
    document.getElementById('selected-product').innerText = '';
    document.getElementById('selected-product-price').innerText = '';
    const selectedExtrasList = document.getElementById('selected-extras');
    while(selectedExtrasList.firstChild){
        selectedExtrasList.removeChild(selectedExtrasList.firstChild);
    }
    document.getElementById('total-modal').innerText = "0€";
}