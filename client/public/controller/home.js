//On window load add listeners
window.addEventListener('load', init);

function init() {
    initialRendering();
}

function initialRendering() {
    if (window.localStorage.getItem("token") != null && window.localStorage.getItem("token").length !== 0) {
        document.getElementById("createRecipeButton").style.display = "inline";
    }
    else {
        document.getElementById("createRecipeButton").style.display = "none";
    }
}