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


