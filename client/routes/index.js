// Directory Structure Example
// Feel free to delete this file.

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

import recipes from '../model/Recipe.js'
import Recipe from "../model/Recipe.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const router = express();
router.set('views', '../views');
router.set('view engine', 'ejs');

let publicPath = path.join(__dirname, '../../public');
router.use(express.static(publicPath));

router.listen(
	PORT,
	() => console.log(`Client side running on http://localhost:${PORT}`)
);


router.get('/', (req, res) => {
	res.render('Home', { title: "Home Page", recipes: recipes} );
});

router.get('/details/:id', (req, res) => {
	const {id} = req.params;
	res.render('Details', {title: 'Recipe Details', recipeID: id})
});

router.get('/login', (req, res) => {
	res.render('Login', { title: "Login"});
});

router.get('/register', (req, res) => {
	res.render('Register', { title: "Register"});
});

router.get('/chefchoice', (req, res) => {
	res.render('ChefChoice', { title: "Chef Choice", recipes: recipes});
});

router.get('/cookbook', (req, res) => {
	res.render('Cookbook', { title: "Your Cookbook", recipes: recipes});
});

router.get('/recipes/:id', (req, res) => {
	const {id} = req.params;
	let selectedRecipe;
	recipes.forEach(r => {
		if (r.id == id) {
			selectedRecipe = r;
		}
	});
	res.render('RecipeDetails', { title: "Recipe Details", rec: selectedRecipe});
});