export default class Recipe {
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
