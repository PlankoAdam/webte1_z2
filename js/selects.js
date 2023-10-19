
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
    let selectedModel = null;
    if(selModel.value == 'choose'){
        total = 0;
    }else{
        selectedModel = getCurrentSubCat().products.filter(obj => {
            return obj.name == selModel.value;
        })[0];
        total = selectedModel.price;
    }

    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].element.checked){
            total += checkboxes[i].price;
        }
    }

    totalLabel.innerHTML = "Spolu: " + total;
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
    for(let opt in selObj.options){
        selObj.remove(opt);
    }
    selObj.add(new Option("Vyberte", 'choose'));
    updateTotal();
}

function resetSelects(){
    removeOptions(selModel);
    removeOptions(selSubCat);
    removeOptions(selCat);
    selInit();
}