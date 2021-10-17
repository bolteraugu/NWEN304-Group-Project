//On window load add listeners
window.addEventListener('load', init);

function init() {
  search();
  updateRecentSearches();
}

function search() {
  document
    .querySelector('#searchButton')
    .addEventListener('click', async function () {
      let searchQuery = document.querySelector('#searchInput').value;
      let urlParams = new URLSearchParams({
        search: searchQuery,
      });
      if (window.localStorage.getItem("token") != null && window.localStorage.getItem('userID') != null) {
        await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem("token")
            }
        }).then(async (response) => {
              if (response.status === 403) {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('cookbookID');
                window.localStorage.removeItem('userID');
                window.location.href = '/?' + urlParams.toString();
              }
              else {
                let userID = window.localStorage.getItem('userID');
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Accept', 'application/json');
                headers.append('Origin', `https://cooked-304-client.herokuapp.com`);
                console.log(userID);
                window.location.href = '/?' + urlParams.toString();
                await fetch(`https://cooked-304-server.herokuapp.com/addSearchKeyword`, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify({
                      keyword: searchQuery,
                      userID: userID
                  })
                });
              }
          })
      }
      else {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('cookbookID');
        window.localStorage.removeItem('userID');
        window.location.href = '/?' + urlParams.toString();
      }
    });

  document
    .querySelector('#searchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
    });
}

async function updateRecentSearches() {
  let recentKeywords = ["spicy", "Japanese", "pizza", "dessert", "Italian", "burgers", "noodles"];
  if (window.localStorage.getItem("token") != null && window.localStorage.getItem('userID') != null) {
    await fetch(`https://cooked-304-server.herokuapp.com/checkToken`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        }
    }).then(async (response) => {
          if (response.status === 403) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('cookbookID');
            window.localStorage.removeItem('userID');
            document.getElementById("searchHeading").innerText = "Popular searches";
          }
          else {
            let userID = window.localStorage.getItem('userID');
            document.getElementById("searchHeading").innerText = "Your recent searches";
            await fetch(`https://cooked-304-server.herokuapp.com/users/${userID}/searches`)
              .then((response) => response.json())
              .then((data) => {
                recentKeywords = data.reverse();
              })
              .catch((e) => {
                console.log(e);
              });
          }
      })
  }
  else {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('cookbookID');
    window.localStorage.removeItem('userID');
    document.getElementById("searchHeading").innerText = "Popular searches";
  }

  recentKeywords.forEach((keyword) => {
    let keywordDiv = document.createElement("div");
    keywordDiv.className = "flex bg-secondary-brown px-2 py-1 m-1 rounded-xl shadow-md hover:shadow-xl";

    let searchTerm = document.createElement("a");
    searchTerm.className = "rounded-m searchTerm";
    searchTerm.href = "/?search=" + keyword;
    searchTerm.innerText = keyword;

    keywordDiv.appendChild(searchTerm);

    document.getElementById("recentKeywords").appendChild(keywordDiv);
  });

}
