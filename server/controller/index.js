// Directory Structure Example
// Feel free to delete this file.

// This file would have methods like:
// - getRecipeByQuery()
// - getRecipeByID()
// - postRecipe()
// etc..

import fetch from "node-fetch";
import {SPOONACULAR_API_KEY} from "../../credentials.js";

export function getRecipeByQuery(query, limit) {
    return fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${query}&number=${limit}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error(e);
        });
}

export function getRecipeByID(id) {
    return fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error(e);
        });
}

export function getSimilarRecipesByID(id) {
    return fetch(
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${SPOONACULAR_API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e);
        });
}

export function getRecipeSummaryByID(id) {
    return fetch(
        `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${SPOONACULAR_API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e);
        });
}
