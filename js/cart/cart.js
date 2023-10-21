import * as products from "./prodSelector.js";
import * as extras from "./extrasCheckbox.js";

export {reset};

const totalLabel = document.getElementById('total-label');
let total = 0;

document.getElementById('sel-model').addEventListener('change', updateTotal);
let extraOptions = document.getElementsByName("extra")
for(let i = 0; i < extraOptions.length; i++){
    extraOptions[i].addEventListener('change', updateTotal);
}

function reset(){
    products.reset();
    extras.reset();
    updateTotal();
}

function updateTotal(){
    total = 0;
    total += products.getSubTotal();
    total += extras.getSubTotal();

    totalLabel.innerHTML = "Spolu: " + total;
    return total;
}