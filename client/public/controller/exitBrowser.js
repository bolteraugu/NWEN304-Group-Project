//On window load add listeners
window.addEventListener('beforeunload', async function (e) {
  if (window.localStorage.getItem("token") != null) {
    await fetch(`http://localhost:8080/createExpiryToken`, {
      method: 'POST',
      body: {userID: window.localStorage.getItem("userID")}
    }).then((response) => response.json())
    .then((data) => {
      window.localStorage.setItem("token", data.token);
    })
  }
});