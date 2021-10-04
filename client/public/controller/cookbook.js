//On window load add listeners
window.addEventListener('load', init);

function init() {
    initialRendering();
}

function initialRendering() {
    var theDiv = document.getElementById("");
    var content = document.createTextNode("<YOUR_CONTENT>");
    theDiv.appendChild(content);
}