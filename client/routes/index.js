import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import fetch from "node-fetch";
import recipes from '../model/Recipe.js';
import Recipe from '../model/Recipe.js';
import { CLIENT_PORT, SERVER_PORT } from '../../credentials.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express();
router.set('views', '../views');
router.set('view engine', 'ejs');

let publicPath = path.join(__dirname, '../../public');
router.use(express.static(publicPath));

router.listen(CLIENT_PORT, () =>
  console.log(`Client side running on http://localhost:${CLIENT_PORT}`)
);


router.get('/', async (req, res) => {
	let searchQuery = req.query.search || "";
	let results = [];
	if (searchQuery) {
		await fetch(`http://localhost:${SERVER_PORT}/recipes?keyword=${searchQuery}`)
			.then((response) => response.json())
			.then((data) => {
				results = data.results;
			})
			.catch((e) => {
				console.log(e);
			});
			res.render('Home', { title: "Home Page", recipes: results, searchQuery: searchQuery} );

	} else {
			// If nothing has been searched
			await fetch(`http://localhost:${SERVER_PORT}/randomrecipes`)
				.then((response) => response.json())
				.then((data) => {
					results = data.recipes;
				})
				.catch((e) => {
					console.log(e);
				});
				res.render('Home', { title: "Home Page", recipes: results, searchQuery: searchQuery} );

	}

});

router.get('/login', (req, res) => {
  res.render('Login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('Register', { title: 'Register' });
});

router.get('/cookbooks/:id', (req, res) => {
  console.log(req);
  res.render('Cookbook', { title: 'Your Cookbook', recipes: recipes });
});

router.get('/createRecipe', (req, res) => {
	res.render('CreateRecipe', { title: "Create Recipe"});
});

router.get('/recipes/:id', async (req, res) => {
	const {id} = req.params;
	let selectedRecipe;
	await fetch("http://localhost:8080/recipes/" + id)
		.then((response) => response.json())
		.then((data) => {
			selectedRecipe = data;
		});
	res.render('RecipeDetails', { title: "Recipe Details", recipe: selectedRecipe});
});
