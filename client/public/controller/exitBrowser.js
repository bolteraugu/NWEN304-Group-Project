//On window load add listeners

//This code is called right before the browser closes
window.addEventListener('beforeunload', async function (e) {
  //If user is logged in
  if (window.localStorage.getItem("token") != null) {
    //Call a function that sets the token to a token that will expire, passes in userID because it is needed during the JWT creation.
    await fetch(`https://cooked-304-server.herokuapp.com/createExpiryToken`, {
      method: 'POST',
      body: {userID: window.localStorage.getItem("userID")}
    }).then((response) => response.json())
    .then((data) => {
      window.localStorage.setItem("token", data.token); //Setting the token
    })
  }
});