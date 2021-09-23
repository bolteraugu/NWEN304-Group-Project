export class Recipe {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

// This probably needs a controller to get the data out
let recipes;

export default recipes = [new Recipe(1, "Butter Chicken"), new Recipe(2, "Pasta")];