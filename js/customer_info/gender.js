import { emptyFieldMessage, setError, setSuccess} from "../util.js";

export { validate, reset };

const genderSelector = document.getElementById('gender-selector');
const otherGenderInput = document.getElementById('other-gender-input');

otherGenderInput.addEventListener('blur', validate);
let genderOptions = document.getElementsByName('gender')
for(let i = 0; i < genderOptions.length; i++) {
    genderOptions[i].addEventListener('change', validate);
    genderOptions[i].addEventListener('change', toggleOtherGenderInput);
}

function validate(){
    document.getElementById('other-gender').value = otherGenderInput.value;
    const genderInputs = document.getElementsByName('gender');
    for(let i = 0; i < genderInputs.length; i++){
        if(genderInputs[i].checked){
            if(genderInputs[i].id == 'other-gender' & otherGenderInput.value == ''){
                setError(genderSelector, emptyFieldMessage);
                return false;
            }
            setSuccess(genderSelector);
            return true;
        }
    }
    setError(genderSelector, 'Vyberťe jednu možnosť!');
    return false;
}

function toggleOtherGenderInput(){
    const otherGenderRadio = document.getElementById('other-gender');
    if(otherGenderRadio.checked) otherGenderInput.style.display = 'block';
    else otherGenderInput.style.display = 'none';
}

function reset(){
    document.getElementById('other-gender').checked = false;
    toggleOtherGenderInput();
}