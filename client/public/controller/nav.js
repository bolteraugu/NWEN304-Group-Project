//On window load add listeners
window.addEventListener('load', initNav);

function initNav() {
    initialRenderingNav();
    logout();
}

function logout() {
    document
      .querySelector('#logoutButton')
      .addEventListener('click', function () {
        window.localStorage.setItem('token', '');
      });
}

function initialRenderingNav() {
    if (window.localStorage.getItem("token") != null && window.localStorage.getItem("token").length !== 0) {
        document.getElementById("cookbookButton").style.display = "flex";
        document.getElementById("logoutButton").style.display = "flex";
    }
    else {
        document.getElementById("registerButton").style.display = "flex";
        document.getElementById("loginButton").style.display = "flex";
    }
}