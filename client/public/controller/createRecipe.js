 //On window load add listeners
window.addEventListener('load', init);

function init() {
    addCreateRecipeListeners();
}

function addCreateRecipeListeners() {
    document.getElementById("createRecipeButton").addEventListener('click', async () => {
        let title = document.getElementById("titleInput").value;
        let servings = document.getElementById("servingsInput").value;
        let readyInMinutes = document.getElementById("readyInMinutesInput").value;
        let ingredientsArrayUnformatted = document.getElementById("ingredientsInput").value.split(",");
        let ingredientsArray = [];
        ingredientsArrayUnformatted.forEach((p) => {
            ingredientsArray.push({original: p.replace(/(\r\n|\n|\r)/gm, "")});
        });
        let preparations = document.getElementById("instructionsInput").value;
        let recipe = {
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
            title: title,
            servings: servings,
            image: "",
            readyInMinutes: readyInMinutes,
            extendedIngredients: ingredientsArray,
            instructions: preparations
        }
        let cookbookID = window.localStorage.getItem("cookbookID")
        //Send a POST request to the server with the request body containing the recipe details
        await fetch(`http://localhost:8080/createRecipe`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Origin: `http://localhost:3000`,
            },
            body: JSON.stringify({recipe: recipe, cookbookID: cookbookID}),
        }).then((response) => {
            //If creating recipe successful then redirect user back to home page
            if (response.ok) {
                window.location.href = '/cookbook/' + cookbookID;
            }
        })
    })
}