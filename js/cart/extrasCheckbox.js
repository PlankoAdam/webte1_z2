export { getSubTotal, reset, getSelectedExtras, getOtherOptionText };

const otherCheckbox = document.getElementById('opt-other');
const otherCheckboxInput = document.getElementById('opt-other-txtbox');
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

checkboxesInit();
otherCheckbox.addEventListener('change', toggleOtherInput);
otherCheckboxInput.addEventListener('input', () => {
    otherCheckbox.value = otherCheckboxInput.value;
});

function getSubTotal(){
    let total = 0;
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].element.checked){
            total += checkboxes[i].price;
        }
    }
    return total;
}

function reset(){
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].element.checked = false;
    }
    toggleOtherInput();
}

function getSelectedExtras(){
    let extras = [];
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].element.checked){
            extras.push(checkboxes[i]);
        }
    }
    return extras;
}

function getOtherOptionText(){
    return otherCheckboxInput.value;
}

function checkboxesInit(){
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].label.innerHTML = checkboxes[i].name;
        checkboxes[i].element.name = checkboxes[i].name;
    }
}

function toggleOtherInput(){
    const otherCheckbox = document.getElementById('opt-other');
    if(otherCheckbox.checked) otherCheckboxInput.style.display = 'block';
    else otherCheckboxInput.style.display = 'none';
}