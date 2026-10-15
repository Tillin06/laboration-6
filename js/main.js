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

async function fetchRecipe(searchInput) {
    const url = `https://dummyjson.com/recipes/search?q=${searchInput}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data;
    
}
//Händelsehanterare för forumlär

async function handleSearch(event) {
    event.preventDefault();
    //Rensa felmeddelande
    errorMessage.textContent = "";
    messageEl.textContent = "";
    //Kontrollera så att sökfältet inte är tomt
    if (searchInput.value.trim() === "") {
        errorMessage.textContent = "The field cannot be empty";
        return;
    }
//Rensa tidigare recept

    recipeContainer.replaceChildren();

//Hämta recept från API
try {
    const data = await fetchRecipe(searchInput.value.trim());

 //Kontrollera om några recept hittades
    if (data.recipes.length === 0) {
        messageEl.textContent = "No recipes found";
        return;
    }
//Hämta första receptet och visa
    const recipe = data.recipes[0];
    displayRecipe(recipe);

//Visa felmeddelande
    } catch (error) {
        console.error ("Something went wrong while fetching recipes:", error);
        recipeContainer.replaceChildren();
        messageEl.textContent = "Something went wrong, try again later";
    }
}

//Eventlyssnare för formuläret
searchForm.addEventListener("submit", handleSearch);


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
    servingsLabel.textContent = "Amount of servings: ";
    servings.append(servingsLabel, document.createTextNode(recipe.servings));

    //Förberedelsetid
    const prepTime = document.createElement("p");
    const prepTimeLabel = document.createElement("strong");
    prepTimeLabel.textContent = "Preparation time:";
    prepTime.append(prepTimeLabel, document.createTextNode(` ${recipe.prepTimeMinutes} minutes`));

    //Tillagningstid
    const cookTime = document.createElement("p");
    const cookTimeLabel = document.createElement("strong");
    cookTimeLabel.textContent = "Cooking time: ";
    cookTime.append(cookTimeLabel, document.createTextNode(` ${recipe.cookTimeMinutes} minutes`));

    //Svårighetsgrad
    const difficulty = document.createElement("p");
    const difficultyLabel = document.createElement("strong");
    difficultyLabel.textContent = "Difficulty: ";
    difficulty.append(difficultyLabel, document.createTextNode(recipe.difficulty));

    //Informationen läggs i receptinfo
    recipeInfo.append(servings, prepTime, cookTime, difficulty);
    article.appendChild(recipeInfo);

    //Rubrik för ingredienser
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";
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
    instructionsTitle.textContent = "Instructions";
    article.appendChild(instructionsTitle);

    //Numrerad list för instruktioner
    const instructionsList = document.createElement("ol");
    recipe.instructions.forEach(function (instruction) {
        const item = document.createElement("li");
        item.textContent = instruction;
        instructionsList.appendChild(item);
    });
    article.appendChild(instructionsList);

    //Lägg till receptet i receptbehållaren
    recipeContainer.appendChild(article);

}

