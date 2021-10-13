//On window load add listeners
window.addEventListener('load', init);

function init() {
    settingUpListenersRecipeList();
}

function settingUpListenersRecipeList() {
    var Anchors = document.getElementById('recipeListDiv').getElementsByTagName("a");

    //For all a tags (all recipes in the cookbook)
    for (var i = 0; i < Anchors.length ; i++) {
        Anchors[i].addEventListener("click", 
            async function (event) {
                //Prevent the redirection
                event.preventDefault();
                //Instead get what the redirection would've been
                let currentHref = event.currentTarget.getAttribute('href');
                //And check if user is logged in
                if (window.localStorage.getItem("token") != null) {
                    //If they are check if their token is valid
                    await fetch(`http://localhost:8080/checkToken`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + window.localStorage.getItem("token")
                        }
                      }).then(async (response) => {
                          //If the token isn't valid then log the user out and clear local storage
                          if (response.status === 403) {
                            window.localStorage.removeItem('token');
                            window.localStorage.removeItem('cookbookID');
                            window.localStorage.removeItem('userID');
                            window.location.href = currentHref + "/false";
                          }
                          else {
                            //Otherwise do usual behaviour
                            window.location.href = currentHref + "/true";
                          }
                    })
                }
                else {
                    //If the token isn't valid then log the user out and clear local storage
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('cookbookID');
                    window.localStorage.removeItem('userID');
                    window.location.href = currentHref + "/false";
                }
            }, 
            false);
    }
}
