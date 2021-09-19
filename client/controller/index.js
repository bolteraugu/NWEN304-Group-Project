window.addEventListener("load",init);
function init(){
    addButtonListener();
}

function addButtonListener() {
    document.querySelector('#submitRegistration').addEventListener("onclick", () => {
        console.log(fetch("http://localhost:8080/register"));
        console.log("hi");
    })
}