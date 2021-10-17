import express, {response} from 'express';
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

router.listen(process.env.PORT, '0.0.0.0', () =>
    console.log(
        'Express server listening on %d, in %s mode',
        process.env.PORT,
        router.get('env')
    )
);

router.get('/', async (req, res) => {
  let results = [];

  if (req.query.search) {
    const urlParams = new URLSearchParams();
    urlParams.append('keyword', req.query.search);

    await fetch(
      `${process.env.SERVER_URL}/recipes?` + urlParams.toString()
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
    await fetch(`${process.env.SERVER_URL}/randomrecipes`)
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

router.get('/resetpassword/:token', async (req, res) => {
  const {token} = req.params;

  res.render('ResetPassword', {
    title: 'Password Reset',
    token: token
  });
});

router.get('/enterEmail', async (req, res) => {

  res.render('EnterEmail', {
    title: 'Enter Email',
  });
});

router.get('/cookbook/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fetch(
    `${process.env.SERVER_URL}/cookbook/${id}`
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

router.get('/recipes/:id/:authorised', async (req, res) => {
  let results = [];
  const id = req.params.id;
  const authorised = req.params.authorised;
  let selectedRecipe;
  await fetch(`${process.env.SERVER_URL}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        selectedRecipe = data;
  });
  if (authorised === "true") {
    await fetch(`${process.env.SERVER_URL}/recipes/${id}/similar`)
    .then((response) => response.json())
    .then((data) => {
      results = data;
    });
    // No duplicates names
    let similarRecipes = results.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj["title"]).indexOf(obj["title"]) === pos;
    });
    res.render('RecipeDetails', {
      title: 'Recipe Details',
      recipe: selectedRecipe,
      similarRecipes: similarRecipes,
    });
  }
  else {
    res.render('RecipeDetails', {
      title: 'Recipe Details',
      recipe: selectedRecipe,
      similarRecipes: null,
    });
  }
  }
);

router.get('/cookbook/:cookbookID/recipes/:id', async (req, res) => {
  const cookbookID = req.params.cookbookID;
  const id = req.params.id;
  let recipe;
  await fetch(`${process.env.SERVER_URL}/cookbook/${cookbookID}/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        recipe = data;
  });

  if (recipe.summary == null) {
    res.render('RecipeDetails', {
      title: 'Recipe Details',
      recipe: recipe,
      similarRecipes: null
    });
  }

  else {
    let results = [];
    await fetch(`${process.env.SERVER_URL}/recipes/${id}/similar`)
    .then((response) => response.json())
    .then((data) => {
      results = data;
    });

    // No duplicates names
    let similarRecipes = results.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj["title"]).indexOf(obj["title"]) === pos;
    });
    if (similarRecipes.length === 0) {
      res.render('RecipeDetails', {
        title: 'Recipe Details',
        recipe: recipe,
        similarRecipes: null
      });
    }
    else {
      res.render('RecipeDetails', {
        title: 'Recipe Details',
        recipe: recipe,
        similarRecipes: similarRecipes
      });
    }
  }

});

// 404 page
router.use((req, res) => {
  res.status(404).render('404', {title: "404 - Page not found"});
});
