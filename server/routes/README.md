# Instructions

To initialise server, run `node .` in this directory.

## GET Requests in Postman or Web Browser:

### Return a list of recipes based on keyword/query
* `http://localhost:8080/recipes?keyword=curry`
* `http://localhost:8080/recipes?keyword=curry&limit=5`

### Returns recipe details based on recipe ID:
* `http://localhost:8080/recipes/650378`