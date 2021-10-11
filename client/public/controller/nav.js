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
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('cookbookID');
        window.localStorage.removeItem('userID');
      });
}

//If you are wondering how the checking token works check out code comments in cookbook.js
async function initialRenderingNav() {
    if (window.localStorage.getItem("token") != null) {
        await fetch(`http://localhost:8080/checkToken`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
          }).then(async (response) => {
              if (response.status === 403) {
                document.getElementById("registerButton").style.display = "flex";
                document.getElementById("loginButton").style.display = "flex";
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('cookbookID');
                window.localStorage.removeItem('userID');
              }
              else {
                document.getElementById("cookbookButton").style.display = "flex";
                document.getElementById("logoutButton").style.display = "flex";
                document.getElementById('cookbookButton').href = '/cookbook/' + window.localStorage.getItem('cookbookID');
                
                document.getElementById("cookbookButton").addEventListener('click', 
                async function (event) {
                    event.preventDefault();
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
                                    window.location.href = '/cookbook/' + window.localStorage.getItem('cookbookID');
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
          })
    }
    else {
        document.getElementById("registerButton").style.display = "flex";
        document.getElementById("loginButton").style.display = "flex";
    }
}