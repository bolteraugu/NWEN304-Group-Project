// Directory Structure Example
// Feel free to delete this file.

import express from 'express';

const PORT = 3000;
const router = express();
router.set('views', '../views');
router.set('view engine', 'ejs');

router.listen(
	PORT,
	() => console.log(`Client side running on http://localhost:${PORT}`)
);


router.get('/', (req, res) => {
	res.render('Home', { title: "Home Page"} );
});

router.get('/login', (req, res) => {
	res.render('Login', { title: "Login"});
});