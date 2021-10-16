# NWEN304 Group Project
_Ahad Rahman, August Bolter, Daniel Pullon, Eris Atienza_

## Instructions:

* Run `npm run server` in the project root directory (this directory) to start our web service API.
* Run `npm run client` in the project root directory (this directory) to start the front-end web app.
Open `http://localhost:3000` in your web browser to interact with the web app.
* Our web app can also be accessed from anywhere on `https://cooked-304-client.herokuapp.com/`

## Interface


## Error Handling
Our error handling is quite robust. It includes the following:
* Always have a `.catch()` whenever a `fetch()` call is made to ensure program does not crash
* Custom 404 page when the user navigates to a page that does not exist
* Error messages for incorrect login details
* Error message during user registration for:
    * user already exists
    * email is not correctly formatted
    * password is too weak

## Commands to access Front-End
* GET `http://localhost:3000/`
* GET `http://localhost:3000/login`
* GET `http://localhost:3000/register`
* GET `http://localhost:3000/cookbook/61651d5f1ecad67b6ec0a6e9`
* GET `http://localhost:3000/cookbook/createRecipe`
* GET `http://localhost:3000/recipes/715394/false`
* GET `http://localhost:3000/cookbook/61650f849328bafeb596cb7a/recipes/652819`


## Example Requests to Server
* GET `http://localhost:8080/recipes?keyword=curry`
* GET `http://localhost:8080/recipes?keyword=curry&limit=5`
* POST `http://localhost:8080/register`
* POST `http://localhost:8080/login`
* POST `http://localhost:8080/signinwithgoogle`
* POST `http://localhost:8080/createRecipe`
* GET `http://localhost:8080/recipes/715394`
* GET `http://localhost:8080/recipes/650378/similar`
* GET `http://localhost:8080/recipes/650378/summary`
* GET `http://localhost:8080/recipes/random`
* GET `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9`
* PUT `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/recipes`
* GET/PUT `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/recipes/650751`
* DELETE `http://localhost:8080/users/61650f849328bafeb596cb7c`
* DELETE `http://localhost:8080/cookbook/61650f849328bafeb596cb7a`
* DELETE `http://localhost:8080/users/61650f849328bafeb596cb7c/searches`
* GET `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/checkRecipe/650751`
* POST `http://localhost:8080/createExpiryToken`
* GET `http://localhost:8080/checkToken`







