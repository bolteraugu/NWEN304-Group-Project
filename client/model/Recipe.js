export class Recipe {
	constructor(id, title, image, servings, readyInMinutes, instructions, extendedIngredients, summary) {
		this.id = id;
		this.title = title;
		this.image = image;
		this.servings = servings;
		this.readyInMinutes = readyInMinutes;
		this.instructions = instructions;
		this.extendedIngredients = extendedIngredients;
		this.summary = summary;
	}
}

// This probably needs a controller to get the data out
let recipes;


export default recipes = [new Recipe(
	716429,
	"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
	"https://spoonacular.com/recipeImages/716429-556x370.jpg",
	2,
	45,
	"Add mayonnaise. Keep adding mayonnaise. Just mayonnaise.",
	[
		"1 tbsp butter",
		"about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
		"2 tbsp grated cheese (I used romano)",
		"1-2 tbsp extra virgin olive oil",
		"5-6 cloves garlic",
		"6-8 ounces pasta (I used linguine)",
		"couple of pinches red pepper flakes, optional",
		"salt and pepper, to taste",
		"3 scallions, chopped, white and green parts separated",
		"2-3 tbsp white wine",
		"1/4 cup whole wheat bread crumbs (I used panko)"
	],
	"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome."
),
	new Recipe(
		716430,
		"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs AGAIN",
		"https://spoonacular.com/recipeImages/716429-556x370.jpg",
		2,
		45,
		"",
		[
			"1 tbsp butter",
			"about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
			"2 tbsp grated cheese (I used romano)",
			"1-2 tbsp extra virgin olive oil",
			"5-6 cloves garlic",
			"6-8 ounces pasta (I used linguine)",
			"couple of pinches red pepper flakes, optional",
			"salt and pepper, to taste",
			"3 scallions, chopped, white and green parts separated",
			"2-3 tbsp white wine",
			"1/4 cup whole wheat bread crumbs (I used panko)"
		],
		"Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs might be a good recipe to expand your main course repertoire. One portion of this dish contains approximately <b>19g of protein </b>,  <b>20g of fat </b>, and a total of  <b>584 calories </b>. For  <b>$1.63 per serving </b>, this recipe  <b>covers 23% </b> of your daily requirements of vitamins and minerals. This recipe serves 2. It is brought to you by fullbellysisters.blogspot.com. 209 people were glad they tried this recipe. A mixture of scallions, salt and pepper, white wine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. From preparation to the plate, this recipe takes approximately  <b>45 minutes </b>. All things considered, we decided this recipe  <b>deserves a spoonacular score of 83% </b>. This score is awesome."
	)];
