import fetch from "node-fetch";

export function getRecipeByQuery(query, limit) {
    return fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}&number=${limit}`
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
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
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
        `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.SPOONACULAR_API_KEY}`
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
        `https://api.spoonacular.com/recipes/${id}/summary?apiKey=${process.env.SPOONACULAR_API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log(e);
        });
}

export function getRandomRecipes(number) {
    return fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=${number}`
    )
      .then((response) => response.json())
      .then((data) => {
          return data;
      })
      .catch((e) => {
          console.log(e);
      });
}