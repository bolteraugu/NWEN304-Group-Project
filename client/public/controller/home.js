//On window load add listeners
window.addEventListener('load', init);

function init() {
    renderingAndListener();
}

//If you are wondering how the checking token works check out code comments in cookbook.js
async function renderingAndListener() {
    if (window.localStorage.getItem("token") != null) {
        await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
          }).then((response) => {
              if (response.status === 403) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('cookbookID');
                window.localStorage.removeItem('userID');
              }
              else {
                document.getElementById("createRecipeButton").style.display = "flex";
              }
          })
    }
    document.getElementById("createRecipeButton").addEventListener("click", 
        async function (event) {
            event.preventDefault();
            if (window.localStorage.getItem("token") != null) {
                await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
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
                        window.location.href = "/createRecipe";
                      }
                })
            }
            else {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('cookbookID');
                window.localStorage.removeItem('userID');
                window.location.href = "/";
            }
        }, 
        false);
}