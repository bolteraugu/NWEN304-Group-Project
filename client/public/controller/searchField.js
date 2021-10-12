//On window load add listeners
window.addEventListener('load', init);

function init() {
  search();
  updateRecentSearches();
}

function search() {
  document
    .querySelector('#searchButton')
    .addEventListener('click', function () {
      let searchQuery = document.querySelector('#searchInput').value;
      let userID = window.localStorage.getItem('userID');
      let urlParams = new URLSearchParams({
        search: searchQuery,
      });
      if (userID) urlParams.append('userID', userID);
      window.location.href = '/?' + urlParams.toString();
    });

  document
    .querySelector('#searchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
    });
}

async function updateRecentSearches() {
  let recentKeywords = ["spicy", "Japanese", "pizza", "dessert", "Italian", "burgers", "noodles"];
  let userID = window.localStorage.getItem('userID');

  if (userID) {
    document.getElementById("searchHeading").innerText = "Your recent searches";
    await fetch(`http://localhost:8080/users/${userID}/searches`)
      .then((response) => response.json())
      .then((data) => {
        recentKeywords = data;
        console.log(recentKeywords);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    document.getElementById("searchHeading").innerText = "Popular searches";
  }
  recentKeywords.forEach((keyword) => {
    let keywordDiv = document.createElement("div");
    keywordDiv.className = "flex bg-secondary-brown px-2 py-1 m-1 rounded-xl hover:bg-secondary-pink shadow-md hover:shadow-lg";

    let searchTerm = document.createElement("a");
    searchTerm.className = "rounded-m searchTerm";
    searchTerm.href = "/?search=" + keyword;
    searchTerm.innerText = keyword;

    keywordDiv.appendChild(searchTerm);

    document.getElementById("recentKeywords").appendChild(keywordDiv);
  });



}
