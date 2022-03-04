// Github: https://github.com/nilssonf/ME132A-U2

"use strict";

// Renders a furniture-objetct into an HTML element
// e.g adds a new furniture to the list
function renderFurniture(furniture){
    let div = document.createElement("div");
    div.classList.add("furniture");
    div.id = furniture.id;

    div.innerHTML = `
        
        <li> ${furniture.name} </li>
        <div> ${furniture.designer} </div>
        <div> ${furniture.year} </div>
        <div> ${furniture.country} </div>
        <button type="button">Remove</button> 
    `;

    return div;
}

// Renders an array of furnitures into the HTML
function renderFurnitures(furnitures){
    let furnituresElement = document.getElementById("furnitures");
    furnituresElement.innerHTML = "";

    //Look through the furnitures and insert their HTML
    for (let furniture of furnitures){
        let furnitureElement = renderFurniture(furniture);
        furnituresElement.appendChild(furnitureElement);
    }

    setRemoveFurnitureHandlers();
}


// Create new furniture-object and return it 
function createNewFurniture (name, designer, year, country){
    let furniture = {
        name: name,
        designer: designer,
        year: year,
        country: country,
    };

    return furniture;
}

// Adds the new furniture to the database
function addFurnitureToDatabase (database, furniture){
    database.push(furniture);
}

// Removes a furniture based on its name from the database
function removeFurnitureById (furnitures, id){
    for (let i = 0; i < furnitures.length; i++){
        let furniture = furnitures[i];

        if (furniture.id == id) {
            furnitures.splice(i, 1);
            // End with return to stop the loop 
            return; 
        }
    }
}

// Return all the furniture based on the country of origin
// Works together with the filter-function
function getFurnituresByCountry(furnitures, country){
    let furnituresByCountry = [];

    for (let furniture of furnitures) {
        if (furniture.country.toLowerCase() == country.toLowerCase()){
            furnituresByCountry.push(furniture);
        }
    }
    return furnituresByCountry;
}

// Return all the furniture based on the designer
// Works together with the filter-function
function getFurnituresByDesigner(furnitures, designer) {
    let furnituresByDesigner = [];

    for (let furniture of furnitures) {
        if (furniture.designer == designer){
            furnituresByDesigner.push(furniture);
        }
    }
    return furnituresByDesigner;
}

// Following are the eventhandlers 

// Eventhandler for the submition of id="add-furniture-form"
// With alert-method when user forgets something
function onAddFurnitureSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let designer = document.getElementById("designer").value;
    let year = Number(document.getElementById("year").value);
    let country = document.getElementById("country").value;
    
    if (name == ""){
        return alert("You forgot something");
    } else if (designer == "") {
        return alert("You forgot something");
    } else if (year == "") {
        return alert("You forgot something");
    } else if(country == "") {
        return alert("You forgot something");
    } 
        
    let furniture = createNewFurniture(name, designer, year, country);

    if (database.length = database.length){
    furniture.id = database[database.length - 1].id + 1; 
    } else {
        furniture.id = 1; 
    }
    
    addFurnitureToDatabase(database, furniture);
    renderFurnitures(database);

   

    let form = document.getElementById("add-furniture-form");
    form.reset();

}

// Eventhandler to add "click" to the button with id="add", e.g what happens when user clicks id=add
function setAddFurnitureHandler() {
    let form = document.getElementById("add-furniture-form");
    form.addEventListener("submit", onAddFurnitureSubmit);
    
}

// Remove furniture when user clicks the remove button
function onRemoveFurnitureClick(event) {
    let button = event.target; 
    let id = button.parentElement.id;
    let confirmOk = confirm("Do you really want to remove this object");

    if (confirmOk == true) {
        removeFurnitureById(database, id);
    } else {
        return false;
    }

    renderFurnitures(database);
}

// Add the click-eventhandler to all the remove-buttons
function setRemoveFurnitureHandlers() {
    let buttons = document.querySelectorAll(".furniture button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveFurnitureClick);
       
    }
}

// Here follows the functions to control the filters

// Filter the furniture by designer 
function onFilterByDesignerSubmit(event) {
    event.preventDefault();

    let designer = document.getElementById("filter-designer").value;

    let furnitures = getFurnituresByDesigner(database, designer);

    renderFurnitures(furnitures);
}

// Filter the furniture by country of origin
function onFilterByCountrySubmit(event) {
    event.preventDefault();

    let country = document.getElementById("filter-country").value;

    let furnitures = getFurnituresByCountry(database, country);

    renderFurnitures(furnitures);
}

// Resetting the list to its original state
function onShowAllFurnituresClick() {
    document.getElementById("filter-designer").value = "";
    document.getElementById("filter-country").value = "";

    renderFurnitures(database);
}

// Which functions should be called when different buttons are used
function setFilterFurnitureHandlers(){
    let designerForm = document.getElementById("filter-by-designer");
    let countryForm = document.getElementById("filter-by-country");
    let showAllFurniture = document.getElementById("reset");

    designerForm.addEventListener("submit", onFilterByDesignerSubmit);
    countryForm.addEventListener("submit", onFilterByCountrySubmit);
    showAllFurniture.addEventListener("click", onShowAllFurnituresClick);
}

// Global values to initialize the page
renderFurnitures(database);
setAddFurnitureHandler();
setFilterFurnitureHandlers();