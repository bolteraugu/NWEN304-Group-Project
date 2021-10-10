//On window load add listeners
window.addEventListener('load', init);

function init() {
  initialRendering();
}

function initialRendering() {
  var theDiv = document.getElementById('');
  var content = document.createTextNode('<YOUR_CONTENT>');
  theDiv.appendChild(content);
}

function deleteUser() {
  const userID = window.localStorage.getItem('userID');
  if (!userID) throw new Error('No user is currently logged in.');
  fetch(`http://localhost:8080/users/${userID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: `http://localhost:3000`,
    },
  });
}
