"use strict";

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