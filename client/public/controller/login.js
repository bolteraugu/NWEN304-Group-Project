
//On window load add listeners
window.addEventListener('load', init);

function init() {
  login();
  loginWithGoogle();
}

function login() {
  //Add one to the login submit button, for when it is clicked.
  document
    .querySelector('#submitLogin')
    .addEventListener('click', async function () {
      //Get the email and password
      let email = document.querySelector('#emailInputLogin').value;
      let password = document.querySelector('#passwordInputLogin').value;
      //Send a POST request to the server with the request body containing the email and password
      await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Origin: `http://localhost:3000`,
        },
        body: JSON.stringify({ emailVal: email, passwordVal: password }),
      })
        .then((response) => {
          //If login was successful then redirect user back to home page (which should be different then if they visited it not logged in)
          if (response.ok) {
            response.json().then((data) => {
              window.localStorage.setItem('token', data.token);
              window.localStorage.setItem('userID', data.userID);
              window.localStorage.setItem('cookbookID', data.cookbookID);
              window.location.href = '/';
            });
          } else {
            //Otherwise if an error occured
            response.json().then((data) => {
              if (data.message) {
                //If it is one of the errors I specifically throw then show it on screen
                document.getElementById('errorMessageLogin').innerText =
                  data.message;
                document.getElementById('errorMessageLogin').style.visibility =
                  'visible';
              } else {
                //Otherwise just log it
                console.log(data);
              }
            });
          }
        })
        .catch((error) => {
          //Log any errors that occur
          console.log(error);
        });
    });
}

function loginWithGoogle() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCPoe-cWObB1rYclRbtg3DRqeKPgX16cGw',
    authDomain: 'cooked-nwen304-2021.firebaseapp.com',
    projectId: 'cooked-nwen304-2021',
    storageBucket: 'cooked-nwen304-2021.appspot.com',
    messagingSenderId: '522804403563',
    appId: '1:522804403563:web:bcd1b79dc2fd9df331402e',
    measurementId: 'G-ES6QRSC4XP',
  };

  firebase.initializeApp(firebaseConfig);
  let provider = new firebase.auth.GoogleAuthProvider();

  document.getElementById('googleLogin').addEventListener('click', () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const credential = res.credential;
        const token = credential.accessToken;

        fetch(`http://localhost:8080/signinwithgoogle`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Origin: `http://localhost:3000`,
          },
          body: JSON.stringify({
            emailVal: res.user.email,
            passwordVal: res.user.uid,
          }),
        }).then((response) => {
          //If login was successful then redirect user back to home page (which should be different then if they visited it not logged in)
          if (response.ok) {
            response.json().then((data) => {
              window.localStorage.setItem('token', data.token);
              window.localStorage.setItem('userID', data.userID);
              window.localStorage.setItem('cookbookID', data.cookbookID);
              window.location.href = '/';
            });
          } else {
            //Otherwise if an error occured
            response.json().then((data) => {
              if (data.message) {
                //If it is one of the errors I specifically throw then show it on screen
                document.getElementById('errorMessageLogin').innerText =
                  data.message;
                document.getElementById('errorMessageLogin').style.visibility =
                  'visible';
              } else {
                //Otherwise just log it
                console.log(data);
              }
            });
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
}
