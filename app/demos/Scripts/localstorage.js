var items = new Array();
var list;
var localStorageKey = "html5_demo_reminders";

window.onload = function () {
    //localstorage checken
    checkExistingItems();
    //<ul> ophalen
    list = document.querySelector("ul");
    //<ul> opvullen
    populateList(list);
    //actiekoppelen aan de button
    var btnVoegToe = document.querySelector("button");
    btnVoegToe.onclick = function () {
        //waarde ophalen van het input veldje
        var item = document.querySelector("input").value;
        //waarde toevoegen
        addItem(item);
    }

    var btnWisAlles = document.querySelectorAll("button")[1];
    btnWisAlles.onclick = function () {
        items = new Array();
        clearList(list);
        saveItems();
    }
}

/*
* kijken of we al reminder in ons local storage hadden
*/
function checkExistingItems() {
    if (localStorage) {
        if (localStorage.getItem(localStorageKey)) {
            var oldItems = localStorage.getItem(localStorageKey);
            var oldItemsArray = JSON.parse(oldItems);
            [].forEach.call(oldItemsArray, function (item) {
                items.push(item);
            });
        }
    }
}

/*
* de <ul> opvullen
*/
function populateList(list) {
    if (list && list.length !== 0) {
        [].forEach.call(items, function (item) {
            var element = document.createElement("li");
            element.innerHTML = item;
            list.appendChild(element);
        });
    }
}
/*
* <ul> wissen
*/
function clearList(list) {
    if (list) {
        var items = list.querySelectorAll("li");
        for (var i = 0; i < items.length; i++) {
            list.removeChild(items[i]);
        }
    }
}
/*
* een item toevoegen
*/
function addItem(item) {
    items.push(item);
    var element = document.createElement("li");
    element.innerHTML = item;
    list.appendChild(element);
    saveItems();
}

//de collectie terug opslaan in local storage
function saveItems() {
    if (localStorage) {
        var itemsToJson = JSON.stringify(items);
        localStorage.setItem(localStorageKey, itemsToJson);
    }
}