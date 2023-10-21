function validateFirstName(){
    const fNameVal = fNameInput.value;
    if(!fNameVal){
        setError(fNameInput, emptyFieldMessage);
        formIsValid = false;
        return;
    }
    setSuccess(fNameInput);
}

function validateLastName(){
    const lNameVal = lNameInput.value;
    if(!lNameVal){
        setError(lNameInput, emptyFieldMessage);
        formIsValid = false;
        return;
    }
    setSuccess(lNameInput);
}

function validateDob(){
    const dobVal = dobInput.value;
    if(!dobVal){
        setError(dobInput, emptyFieldMessage);
        formIsValid = false;
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
        formIsValid = false;
        return;
    }

    if(ageVal > 99) ageInput.value = 99;
    else if(ageVal < 0) ageInput.value = 0;

    ageVal = ageInput.value;
    if(ageVal == null || ageVal == '') return;
    if(!dobInput.value){
        setError(dobInput, emptyFieldMessage);
        formIsValid = false;
    }
    else if(ageVal != getAge(dobInput.value)){
        const message = 'Dátum narodenia a vek nezhodujú!';
        setError(dobInput, message);
        setError(ageInput, message);
        formIsValid = false;
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
        formIsValid = false;
        return;
    }

    const regex1 = /^[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,4}$/i;
    const regex2 = /^.{3,}@.*$/i;
    if(regex1.test(emailVal) & regex2.test(emailVal)){
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Nevalidný formát!');
        formIsValid = false;
    }
}

function validateGender(){
    const genderInputs = document.getElementsByName('gender');
    for(let i = 0; i < genderInputs.length; i++){
        if(genderInputs[i].checked){
            if(genderInputs[i].id == 'other-gender' & otherGenderInput.value == ''){
                setError(genderSelector, emptyFieldMessage);
                return;
            }
            setSuccess(genderSelector);
            return;
        }
    }
    formIsValid = false;
    setError(genderSelector, 'Vyberťe jednu možnosť!');
}

function validateForm(){
    formIsValid = true;
    validateFirstName();
    validateLastName();
    validateDob();
    validateAge();
    validateEmail();
    validateGender();
    if(formIsValid){
        sendForm();
    }
}