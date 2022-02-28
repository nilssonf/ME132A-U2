"use strict";

// Renders a furniture-objetct into an HTML element
function renderFurniture(furniture){
    let div = document.createElement("div");
    div.classList.add("furniture");
    div.id = furniture.id;

    div.innerHTML = `
        <div> ${furniture.name} </div>
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

    // Add remove-handlers for our dogs
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
        let furniture = furnitures [i];

        if (furniture.id == id) {
            furnitures.splice(i, 1);
            // End with return to stop the loop 
            return; 
        }
    }
}

// Return all the furniture based on the country of origin
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
function onAddFurnitureSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let designer = document.getElementById("designer").value;
    let year = Number(document.getElementById("year").value);
    let country = document.getElementById("country").value;

    let furniture = createNewFurniture(name, designer, year, country);

    furniture.id = database[database.length - 1].id + 1; 

    addFurnitureToDatabase(database, furniture);
    renderFurnitures(database);

    let form = document.getElementById("add-furniture-form");
    form.reset();

}

// Eventhandler to add "click" to the button with id="add"
function setAddFurnitureHandler() {
    let form = document.getElementById("add-furniture-form");
    form.addEventListener("submit", onAddFurnitureSubmit);
}

// Remove furniture when user clicks the remove button
function onRemoveFurnitureClick(event) {
    let button = event.target; 
    let id = button.parentElement.id;

    removeFurnitureById(database, id);
    renderFurnitures(database);
}

// Add the click-eventhandler to all the remove-buttons
function setRemoveFurnitureHandlers() {
    let buttons = document.querySelectorAll(".furniture button");

    for (let button of buttons) {
        button.addEventListener("click", onAddFurnitureSubmit);
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

// Global values to initialize the page
renderFurnitures(database);