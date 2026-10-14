"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Tilda Öström Linde
 */

//Hämta element

const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#error");
const messageEl = document.querySelector("#message");
const recipeContainer = document.querySelector("#recipe");

//Hämta recept från API

async function fetchRecipe(searchTerm) {
    const url = `https://dummyjson.com/recipes/search?q=${searchTerm}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Något gick fel");
    }
    const data = await response.json();
    return data;
}

//Visa recept

function displayRecipe(recipe) {
    //Skapa article element från html
    const article = document.createElement("article");
    //Skapa receptets namn
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    article.appendChild(title);
    //Skapa receptets bild
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    article.appendChild(image);
    //Skapa receptetinformation behållare
    const recipeInfo = document.createElement("div");
    recipeInfo.classList.add("recipe-info");
    //Skapa receptets beskrivning
    //Antal portioner
    const servings = document.createElement("p");
    const servingsLabel = document.createElement("strong");
    servingsLabel.textContent = "Antal portioner:";
    servings.append(servingsLabel, document.createTextNode(recipe.servings));
    //Förberedelsetid
    const prepTime = document.createElement("p");
    const prepTimeLabel = document.createElement("strong");
    prepTimeLabel.textContent = "Förberedelsetid:";
    prepTime.append(prepTimeLabel, document.createTextNode(recipe.prepTime));
    //Tillagningstid
    const cookTime = document.createElement("p");
    const cookTimeLabel = document.createElement("strong");
    cookTimeLabel.textContent = "Tillagningstid:";
    cookTime.append(cookTimeLabel, document.createTextNode(recipe.cookTime));
    //Svårighetsgrad
    const difficulty = document.createElement("p");
    const difficultyLabel = document.createElement("strong");
    difficultyLabel.textContent = "Svårighetsgrad:";
    difficulty.append(difficultyLabel, document.createTextNode(recipe.difficulty));
    //Informationen läggs i receptinfo
    recipeInfo.appendChild(servings, prepTime, cookTime, difficulty);
    article.appendChild(recipeInfo);

    //Rubrik för ingredienser
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredienser";
    article.appendChild(ingredientsTitle);

    //Punktlista för ingredienser
    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach(function (ingredient) {
        const item = document.createElement("li");
        item.textContent = ingredient;
        ingredientsList.appendChild(item);
    });
    article.appendChild(ingredientsList);

    //Rubrik för instruktioner
    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instruktioner";
    article.appendChild(instructionsTitle);

    //Numrerad list för instruktioner
    const instructionsList = document.createElement("ol");
    recipe.instructionsList.forEach(function (instruction) {
        const item = document.createElement("li");
        item.textContent = instruction;
        instructionsList.appendChild(item);
    });
    article.appendChild(instructionsList);
    //Lägg till receptet i receptbehållaren
    recipeContainer.appendChild(article);

}

//Händelsehanterare för forumlär

async function handleSearch(event) {
    event.preventDefault();
    //Kontrollera så att sökfältet inte är tomt
    if (searchInput.value.trim() === "") {
        errorMessage.textContent = "Skriv in ett sökord";
        return;
    }
    //Rensa tidigare meddelanden och recept
    errorMessage.textContent = "";
    messageEl.textContent = "";
    recipeContainer.innerHTML = "";
//Hämta recept från API
try {
    const data = await fetchRecipe(searchInput);
    //Kontrollera om några recept hittades
    if (data.recipes.length === 0) {
        messageEl.textContent = "Inga recept hittades";
        return;
    }
    //Hämta första receptet och visa
    const recipe = data.recipes[0];
    displayRecipe(recipe);
    //Visa felmeddelande
    } catch (error) {
    errorMessage.textContent = "Något gick fel, försök igen senare";
    }
}

//Eventlyssnare för formuläret

