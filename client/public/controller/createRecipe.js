 //On window load add listeners
window.addEventListener('load', init);

function init() {
    addCreateRecipeListeners();
}

//If you are wondering how the checking token works check out code comments in cookbook.js
function addCreateRecipeListeners() {
    document.getElementById("createRecipeButton").addEventListener('click', async () => {
        if (window.localStorage.getItem("token") != null) {
            await fetch(`http://localhost:8080/checkToken`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                }
                }).then(async (response) => {
                    if (response.status === 403) {
                        window.localStorage.removeItem('token');
                        window.localStorage.removeItem('cookbookID');
                        window.localStorage.removeItem('userID');
                        window.location.href = "/";
                    }
                    else {
                        let title = document.getElementById("titleInput").value;
                        let servings = document.getElementById("servingsInput").value;
                        let readyInMinutes = document.getElementById("readyInMinutesInput").value;
                        let ingredientsArrayUnformatted = document.getElementById("ingredientsInput").value.split(",");
                        let ingredientsArray = [];
                        ingredientsArrayUnformatted.forEach((p) => {
                            ingredientsArray.push({original: p.replace(/(\r\n|\n|\r)/gm, "")});
                        });
                        let instructions = document.getElementById("instructionsInput").value;
                        let recipe = {
                            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
                            title: title,
                            servings: servings,
                            image: "",
                            readyInMinutes: readyInMinutes,
                            extendedIngredients: ingredientsArray,
                            instructions: instructions
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
                    }
                })
        }
        else {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('cookbookID');
            window.localStorage.removeItem('userID');
            window.location.href = "/";
        }
    })
}