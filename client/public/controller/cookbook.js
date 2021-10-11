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
                    deleteCookbook(window.localStorage.getItem("cookbookID"))
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("cookbookID");
                    window.localStorage.removeItem("userID");
                    initialRenderingNav();
                    window.location.href = '/';
                } else {
                    console.log("Error, user not found.");
                }
            });
        })
}

const deleteCookbook = async (cookbook_id) => {
    await fetch(
        `http://localhost:8080/cookbook/${cookbook_id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Origin: `http://localhost:3000`,
            },
        }
    ).then(() => window.location.href = '/')}
