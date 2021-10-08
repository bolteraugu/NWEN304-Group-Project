//On window load add listeners
window.addEventListener('load', init);

function init() {
    addCreateRecipeListeners();
}

function addCreateRecipeListeners() {
    document.getElementById("createRecipeButton").addEventListener('click', () => {
        let prepArray = document.getElementById("ingredientsInput").value.split(",");
        prepArray.forEach((p) => {
            console.log(p.replace(/(\r\n|\n|\r)/gm, ""));
        })
    })
}