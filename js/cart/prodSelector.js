import { setDefault, setError } from "../util.js";

export { validate, getSubTotal, reset, getCurrentModel };

const categories = [
    {
        name:"Speakers",
        subCategories:[
            {
                name:"Bookshelf",
                products:[
                    {
                        name:"KEF LS50 Meta",
                        price:100.0
                    },
                    {
                        name:"Elac Debut B5.2",
                        price:69.0
                    }
                ]
            },
            {
                name:"Standing",
                products:[
                    {
                        name:"Q Acoustics 5040",
                        price:420.0
                    },
                    {
                        name:"Wharfedale Diamond 12.3",
                        price:690.0
                    }
                ]
            }
        ]
    },
    {
        name:"Headphones",
        subCategories:[
            {
                name:"Closed-back",
                products:[
                    {
                        name:"Sony MDR-7506",
                        price:100.0
                    },
                    {
                        name:"Beyerdynamic DT 770 PRO",
                        price:69.0
                    }
                ]
            },
            {
                name:"Open-back",
                products:[
                    {
                        name:"Sennheiser HD 800 S",
                        price:420.0
                    },
                    {
                        name:"HiFiMan Edition XS",
                        price:690.0
                    }
                ]
            }
        ]
    },
    {
        name:"Earphones",
        subCategories:[
            {
                name:"Wired",
                products:[
                    {
                        name:"Shure Aonic 3",
                        price:100.0
                    },
                    {
                        name:"SoundMagic E11C",
                        price:69.0
                    }
                ]
            },
            {
                name:"Wireless",
                products:[
                    {
                        name:"AirPods Pro",
                        price:420.0
                    },
                    {
                        name:"AKG N400",
                        price:690.0
                    }
                ]
            }
        ]
    }
];

const selCat = document.getElementById('sel-cat');
const selSubCat = document.getElementById('sel-sub-cat');
const selModel = document.getElementById('sel-model');

selCat.addEventListener('change', updateSelSubCat);
selSubCat.addEventListener('change', updateSelModel);
selModel.addEventListener('change', validate);
selInit();

function validate(){
    if(getCurrentModel() == null){
        setError(selModel, 'Vyberte si produkt!');
        return false;
    }
    setDefault(selModel.parentElement);
    return true;
}

function getSubTotal(){
    if(getCurrentModel() == null) return 0;
    else return getCurrentModel().price;
}

function reset(){
    removeOptions(selModel);
    removeOptions(selSubCat);
    removeOptions(selCat);
    selInit();
}

function getCurrentModel(){
    if(selModel.value == 'choose') return null;
    return getCurrentSubCat().products.filter(obj => {
        return obj.name == selModel.value;
    })[0];
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
}