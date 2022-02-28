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
function removeFurnitureByName (){

}

// Global values to initialize the page
renderFurnitures(database);