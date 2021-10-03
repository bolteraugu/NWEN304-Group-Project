//On window load add listeners
window.addEventListener('load', init);

function init() {
    logout();
    initialRendering();
}

function logout() {
    document
      .querySelector('#logoutButton')
      .addEventListener('click', function () {
        window.localStorage.setItem('token', '');
      });
}

function initialRendering() {
    if (window.localStorage.getItem("token") != null && window.localStorage.getItem("token").length !== 0) {
        document.getElementById("registerButton").style.display = "none";
        document.getElementById("loginButton").style.display = "none";
    }
    else {
        document.getElementById("cookbookButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "none";
    }
}