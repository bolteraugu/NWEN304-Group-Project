//On window load add listeners
window.addEventListener('load', init);

function init() {
    register();
    passwordComplexity();
}

function register() {
//Add one to the registration submit button, for when it is clicked.
document
      .querySelector('#submitRegistration')
      .addEventListener('click', async function () {
        //Get the email and password
        let email = document.querySelector('#emailInput').value;
        let password = document.querySelector('#passwordInput').value;
        //Send a POST request to the server with the request body containing the email and password
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', `http://localhost:${process.env.CLIENT_PORT}`);

        await fetch(`http://localhost:${process.env.SERVER_PORT}/register`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ emailVal: email, passwordVal: password }),
        })
          .then((response) => {
            //If account was created successfully then redirect user back to home page (which should be different then if they visited it not logged in)
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
                  document.getElementById('errorMessage').innerText =
                    data.message;
                  document.getElementById('errorMessage').style.visibility =
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

function passwordComplexity() {
    //Code for showing and stylising the password complexity bar
    document
      .querySelector('#passwordInput')
      .addEventListener('input', function () {
        let currentPassword = document.querySelector('#passwordInput').value;
        //If the user hasn't entered in a password yet then don't show the bar
        if (currentPassword.length === 0) {
          document.getElementById('complexityBar').style.visibility = 'hidden';
        } else {
          //Otherwise figure out how many of the complexity requirements the password meets
          numRequirementsMet = 0;
          //Getting screen dimensions for later
          width = window.innerWidth;
          height = window.innerHeight;
          //Checking if password is at least 8 characters
          if (currentPassword.length >= 8) {
            numRequirementsMet++;
          }
          //Checking if password has at least one number
          if (currentPassword.match('^(?=.*[0-9])')) {
            numRequirementsMet++;
          }
          //Checking if password has at least one symbol
          if (currentPassword.match('^(?=.*[!@#$%^&*])')) {
            numRequirementsMet++;
          }
          //Then stylise based on number of requirements met. The more requirements the longer the bar and the more green it will be.
          if (numRequirementsMet === 0) {
            document.getElementById('complexityBar').style.width = width * 0.03;
            document.getElementById('complexityBar').style.background = 'red';
          } else if (numRequirementsMet === 1) {
            document.getElementById('complexityBar').style.width = width * 0.06;
            document.getElementById('complexityBar').style.background =
              'orange';
          } else if (numRequirementsMet === 2) {
            document.getElementById('complexityBar').style.width = width * 0.09;
            document.getElementById('complexityBar').style.background =
              'yellow';
          } else {
            document.getElementById('complexityBar').style.width = width * 0.12;
            document.getElementById('complexityBar').style.background = 'green';
          }
          //Stylising that is the same regardless of the amount of requirements met.
          document.getElementById('complexityBar').style.height =
            height * 0.012;
          document.getElementById('complexityBar').style.left = width * 0.03;
          document.getElementById('complexityBar').style.top = height * 0.03;
          document.getElementById('complexityBar').style.visibility = 'visible';
        }
      });
}