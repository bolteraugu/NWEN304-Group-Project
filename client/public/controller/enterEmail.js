//On window load add listeners
window.addEventListener('load', init);

function init() {
    forgotPassword();
}

function forgotPassword() {
    document.getElementById('submitEmail').addEventListener('click', () => {
        let email = document.querySelector('#emailInput').value;

        fetch(`https://cooked-304-server.herokuapp.com/resetpassword`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Origin: `https://cooked-304-client.herokuapp.com`,
            },
            body: JSON.stringify({emailVal: email}),

        }).then((response) => {

            if (response.ok) {
                alert("An email containing a link to reset your password has been sent to your email address. Please check your spam folder.")
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
        });
    })
}
