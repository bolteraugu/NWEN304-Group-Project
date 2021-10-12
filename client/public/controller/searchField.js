//On window load add listeners
window.addEventListener('load', init);

function init() {
  search();
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
