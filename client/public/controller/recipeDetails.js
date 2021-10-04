//On window load add listeners
window.addEventListener('load', initRD);

async function initRD() {
    await initialRenderingRecipeDetails();
    addListeners();
}

let recipeVal = document.getElementsByClassName('recipeStore');
let recipe = JSON.parse(recipeVal[0].dataset.testValue);
let cookbookID = window.localStorage.getItem("cookbookID");

async function initialRenderingRecipeDetails() {
if (window.localStorage.getItem("token") != null && window.localStorage.getItem("token").length !== 0) {
    let hasRecipe = false;
    await fetch('http://localhost:8080/cookbook/' + cookbookID + '/checkRecipe/' + recipe.id, {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    })
    .then((response) => response.json())
    .then((data) => {
    hasRecipe = data.hasRecipe;
    })
    .catch((e) => {
    console.log(e);
    });
    if (hasRecipe) {
    document.getElementById("removeRecipe").style.display = "flex";
    }
    else {
    document.getElementById("saveRecipe").style.display = "flex";
    }
}
}

async function addListeners() {
if(document.getElementById("removeRecipe").style.display != "none") {
    document.getElementById("removeRecipe").addEventListener('click', () => removeRecipe(cookbookID, recipe.id));
}
else {
    document.getElementById("saveRecipe").addEventListener('click', () => addRecipe(cookbookID, recipe));
}
}

/**
 * For bookmarking recipes to your cookbook.
 * @param {String} cookbook_id 
 * @param recipe 
 * @returns Response
 */
const addRecipe = (cookbook_id, recipe) =>
fetch(`http://localhost:8080/cookbook/${cookbook_id}/recipes/`, {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Origin: `http://localhost:3000`,
    },
    body: JSON.stringify({recipe: recipe}),
}).then(() => window.location.href = window.location.href);

const removeRecipe = (cookbook_id, recipe_id) => {
fetch(
    `http://localhost:8080/cookbook/${cookbook_id}/recipes/${recipe_id}`,
    {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: `http://localhost:3000`,
    },
    }
).then(() => window.location.href = window.location.href)

};