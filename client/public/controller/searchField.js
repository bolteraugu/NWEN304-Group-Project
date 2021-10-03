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
      window.location.href = '/?search=' + searchQuery;
    });

  document
    .querySelector('#searchForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();
    });
}