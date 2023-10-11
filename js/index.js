const form = document.getElementById('form');
const dobInput = document.getElementById('date-of-birth');
const ageInput = document.getElementById('age');

form.addEventListener('submit', e => {
    e.preventDefault();
})

function validateAge(){
    var ageVal = ageInput.value;
    if(ageVal > 99) ageInput.value = 99;
    else if(ageVal < 0) ageInput.value = 0;

    ageVal = ageInput.value;
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

function validateDob(){
    var dobVal = dobInput.value;
    if(ageInput.value == null || ageInput.value == '') ageInput.value = getAge(dobVal);
}