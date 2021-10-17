# NWEN304 Group Project
_Ahad Rahman, August Bolter, Daniel Pullon, Eris Atienza_

## Instructions:

* Run `npm run server` in the project root directory (this directory) to start our web service API.
* Run `npm run client` in the project root directory (this directory) to start the front-end web app.
Open `http://localhost:3000` in your web browser to interact with the web app.
* Our web app can also be accessed from anywhere on `https://cooked-304-client.herokuapp.com/`

## Front-end Web App Interface
Our web app runs on an Express server to handle the routes. EJS is used as the view engine, which is rendered
server-side. All JavaScript code for our controller is stored in `/client/public/controller`, which is publicly available
to the code and the controller is used in a variety of ways such as dynamically updating the DOM and verifying login details.
This is run by the user's browser's JavaScript engine.

## Web Service API Interface
Our web service runs entirely on an Express server. All the endpoints are defined in `server/routes/index.js`.  
Our web service communicates with MongoDB and Spoonacular.

## Error Handling
Our error handling is quite robust. It includes the following:
* Have a `.catch()` whenever a `fetch()` call is made to ensure program does not crash
* Web Service API sends back HTTP response codes
* Custom 404 page when the user navigates to a page that does not exist
* Error messages for incorrect login details
* Error message during user registration for:
    * user already exists
    * email is not correctly formatted
    * password is too weak
* Error message during setting a new password for:
    * password is too weak

## Commands to access Front-End
* GET `http://localhost:3000/` - Home page
* GET `http://localhost:3000/?search=chocolate` - Searching for a recipe on the home page
* GET `http://localhost:3000/login` - Login page
* GET `http://localhost:3000/register` - Recipe page
* GET `http://localhost:3000/resetPassword/${One-Time-Token}` - Submitting new password page
* GET `http://localhost:3000/enterEmail/` - Entering email for password reset page
* GET `http://localhost:3000/cookbook/61651d5f1ecad67b6ec0a6e9` - User's cookbook page
* GET `http://localhost:3000/createRecipe` - Create Recipe page
* GET `http://localhost:3000/recipes/715394/false` - Access the details of a recipe as a guest user
* GET `http://localhost:3000/recipes/715394/true` - Access the details of a recipe as a logged in user (save/remove recipe button will be available to them)
* GET `http://localhost:3000/cookbook/61650f849328bafeb596cb7a/recipes/652819` - Access the details of a recipe stored in the user's cookbook

## Example Requests to Server
* GET `http://localhost:8080/recipes?keyword=curry` - Spoonacular query for recipes with keyword
* GET `http://localhost:8080/recipes?keyword=curry&limit=5` - Spoonacular query for recipes with keyword and specified limit of results returned
* POST `http://localhost:8080/register` - Register user (send their details to MongoDB)
* POST `http://localhost:8080/login` - Login user (check their inputted details against MongoDB)
* POST `http://localhost:8080/signinwithgoogle` - Login user with OAuth 2.0 and register them (send their details to MongoDB) if it is their first time logging with OAuth 2.0.
* POST `http://localhost:8080/resetpassword` - Send the user an email containing a reset password link with a one time token embedded in the link.
* PUT `http://localhost:8080/resetpassword` - Change a user's password to the new password they inputted
* POST `http://localhost:8080/createRecipe` - Create a recipe based on the user-inputted recipe details
* GET `http://localhost:8080/recipes/715394` - Fetch a specific recipe's details from Spoonacular
* GET `http://localhost:8080/recipes/650378/similar` - Fetch recipes similar to the specified recipe from Spoonacular 
* GET `http://localhost:8080/recipes/650378/summary` - Get a specified recipe's summary
* GET `http://localhost:8080/recipes/random` - Fetch a random set of recipes from Spoonacular
* GET `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9` - Fetch a user's cookbook
* PUT `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/recipes` - Add a recipe to the user's cookbook
* GET `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/recipes/650751` - Get a recipe from the user's cookbook
* PUT `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/recipes/650751` - Remove a recipe from the user's cookbook
* DELETE `http://localhost:8080/users/61650f849328bafeb596cb7c` - Delete a user's account (deletes their details from MongoDB)
* DELETE `http://localhost:8080/cookbook/61650f849328bafeb596cb7a` - Delete cookbook in MongoDB that is associated with a user when the user deletes their account
* GET `http://localhost:8080/users/61650f849328bafeb596cb7c/searches` - Get user's recent searches from MongoDB
* GET `http://localhost:8080/cookbook/61651d5f1ecad67b6ec0a6e9/checkRecipe/650751` - Check if a recipe is in a user's cookbook
* POST `http://localhost:8080/createExpiryToken` - Creates JWT token when the user exits the web app, and the token will expire after a while.
* GET `http://localhost:8080/checkToken` - Checks whether the user's JWT token is expired or not.







