// Directory Structure Example
// Feel free to delete this file.

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const router = express();
router.set('views', '../views');
router.set('view engine', 'ejs');

let x = path.join(__dirname, '../../public');
console.log(x);
router.use(express.static(x));

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