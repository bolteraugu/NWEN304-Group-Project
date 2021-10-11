//On window load add listeners
window.addEventListener('load', init);

function init() {
    renderingAndListener();
}

async function renderingAndListener() {
    if (window.localStorage.getItem("token") != null) {
        await fetch(`http://localhost:8080/checkToken`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
          }).then((response) => {
              if (response.status !== 403) {
                document.getElementById("createRecipeButton").style.display = "flex";
              }
          })
    }
    document.getElementById("createRecipeButton").addEventListener("click", 
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
                        window.location.href = window.location.href;
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
                window.location.href = window.location.href;
            }
        }, 
        false);
}