import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express();
router.set('views', './client/views');
router.set('view engine', 'ejs');

let publicPath = path.join(__dirname, '../public');
router.use(express.static(publicPath));

router.listen(process.env.CLIENT_PORT, () =>
  console.log(
    `Client side running on http://localhost:${process.env.CLIENT_PORT}`
  )
);

router.get('/', async (req, res) => {
  let results = [];

  if (req.query.search) {
    const urlParams = new URLSearchParams();
    urlParams.append('search', req.query.search);
    if (req.query.userID) urlParams.append('userID', req.query.userID);

    await fetch(
      `http://localhost:${process.env.SERVER_PORT}/recipes?keyword=` + urlParams.toString()
    )
      .then((response) => response.json())
      .then((data) => {
        results = data.results;
      })
      .catch((e) => {
        console.log(e);
      });
    res.render('Home', {
      title: 'Home Page',
      recipes: results,
      searchQuery: req.query.search,
    });
  } else {
    // If nothing has been searched
    await fetch(`http://localhost:${process.env.SERVER_PORT}/randomrecipes`)
      .then((response) => response.json())
      .then((data) => {
        results = data.recipes ? data.recipes : [];
      })
      .catch((e) => {
        console.log(e);
      });
    res.render('Home', {
      title: 'Home Page',
      recipes: results,
      searchQuery: '',
    });
  }
});

router.get('/login', (req, res) => {
  res.render('Login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('Register', { title: 'Register' });
});

router.get('/cookbook/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fetch(
    `http://localhost:${process.env.SERVER_PORT}/cookbook/${id}`
  ).then((response) => response.json());

  res.render('Cookbook', {
    title: 'Your Cookbook',
    id: data.response._id,
    recipes: data ? data.response.recipes : [],
  });
});

router.get('/createRecipe', (req, res) => {
  res.render('CreateRecipe', { title: 'Create Recipe' });
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  let selectedRecipe;
  await fetch(`http://localhost:${process.env.SERVER_PORT}/recipes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      selectedRecipe = data;
    });
  res.render('RecipeDetails', {
    title: 'Recipe Details',
    recipe: selectedRecipe,
  });
});

router.get('/cookbook/:cookbookID/recipes/:id', async (req, res) => {
  const cookbookID = req.params.cookbookID;
  const id = req.params.id;
  let recipe;
  await fetch(`http://localhost:${process.env.SERVER_PORT}/cookbook/${cookbookID}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        recipe = data;
  });
  res.render('RecipeDetails', {
    title: 'Recipe Details',
    recipe: recipe,
  });
});

