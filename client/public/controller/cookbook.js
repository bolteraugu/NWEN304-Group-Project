//On window load add listeners
window.addEventListener('load', init);

function init() {
    deleteUser();
}

function deleteUser() {
    document
        .querySelector('#deleteUser')
        .addEventListener('click', async function () {
            const userID = window.localStorage.getItem('userID');
            if (!userID) throw new Error('No user is currently logged in.');
            await fetch(`http://localhost:8080/users/${userID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Origin: `http://localhost:3000`,
                },
            }).then((response) => {
                if (response.ok){
                    window.localStorage.removeItem("token");
                    initialRenderingNav();
                    window.location.href = '/';
                } else {
                    console.log("Error, user not found.");
                }
            });
        })
}
