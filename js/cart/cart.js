import * as products from "./prodSelector.js";
import * as extras from "./extrasCheckbox.js";

export { validate, reset, getSelectedProduct, getSelectedExtras, getOtherOptionText, getTotal };

const totalLabel = document.getElementById('total-label');
let total = 0;

document.getElementById('sel-model').addEventListener('change', updateTotal);
let extraOptions = document.getElementsByName("extra")
for(let i = 0; i < extraOptions.length; i++){
    extraOptions[i].addEventListener('change', updateTotal);
}

function validate(){
    return products.validate();
}

function reset(){
    products.reset();
    extras.reset();
    updateTotal();
}

function getSelectedProduct(){
    return products.getCurrentModel();
}

function getSelectedExtras(){
    return extras.getSelectedExtras();
}

function getOtherOptionText(){
    return extras.getOtherOptionText();
}

function getTotal(){
    return total;
}

function updateTotal(){
    total = products.getSubTotal() + extras.getSubTotal();
    totalLabel.innerHTML = "Spolu: " + total;
}