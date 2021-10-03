//On window load add listeners
window.addEventListener('load', initialRendering);

function init() {
    initialRendering();
    // logout();
}

function logout() {
    document
      .querySelector('#logoutButton')
      .addEventListener('click', function () {
        window.localStorage.setItem('token', '');
      });
}

function initialRendering() {
    logout();

    console.log("nav");
    if (window.localStorage.getItem("token") != null && window.localStorage.getItem("token").length !== 0) {
        document.getElementById("registerButton").style.display = "none";
        document.getElementById("loginButton").style.display = "none";
    }
    else {
        document.getElementById("cookbookButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "none";
    }
}