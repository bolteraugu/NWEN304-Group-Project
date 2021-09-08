# Spoonacular Research

- API has really good documentation
- Tons of data
- Recipes provide similar recipes
- This is my recommendation


## Recipes

### Search Recipe
1. Search recipes by general query (e.g "pasta")
2. Search recipes by nutrients
3. Search recipes by ingredients

<details>
  <summary>See Example</summary>

```
{
    "results": [
        {
            "id": 654959,
            "title": "Pasta With Tuna",
            "image": "https://spoonacular.com/recipeImages/654959-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 511728,
            "title": "Pasta Margherita",
            "image": "https://spoonacular.com/recipeImages/511728-312x231.jpg",
            "imageType": "jpg"
        },
        {
            "id": 654812,
            "title": "Pasta and Seafood",
            "image": "https://spoonacular.com/recipeImages/654812-312x231.jpg",
            "imageType": "jpg"
        }
    ],
    "offset": 0,
    "number": 3,
    "totalResults": 210
}
```

</details>

### Get Recipe
1. Get recipe by ID
2. Get similar recipes
3. Get random recipes

<details>
  <summary>See Example</summary>

  ```
  {
    "vegetarian": false,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": true,
    "veryHealthy": true,
    "cheap": false,
    "veryPopular": false,
    "sustainable": false,
    "weightWatcherSmartPoints": 16,
    "gaps": "no",
    "lowFodmap": false,
    "aggregateLikes": 2,
    "spoonacularScore": 94.0,
    "healthScore": 100.0,
    "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
    "license": "CC BY 3.0",
    "sourceName": "Foodista",
    "pricePerServing": 142.74,
    "extendedIngredients": [
        {
            "id": 10211821,
            "aisle": "Produce",
            "image": "yellow-bell-pepper.jpg",
            "consistency": "solid",
            "name": "bell pepper",
            "nameClean": "bell pepper",
            "original": "1 Dried hot pepper (opt)",
            "originalString": "1 Dried hot pepper (opt)",
            "originalName": "Dried hot pepper (opt)",
            "amount": 1.0,
            "unit": "",
            "meta": [
                "dried",
                "hot",
                "(opt)"
            ],
            "metaInformation": [
                "dried",
                "hot",
                "(opt)"
            ],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "",
                    "unitLong": ""
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "",
                    "unitLong": ""
                }
            }
        },
        {
            "id": 16057,
            "aisle": "Pasta and Rice;Canned and Jarred;Ethnic Foods",
            "image": "chickpeas.png",
            "consistency": "solid",
            "name": "chickpeas",
            "nameClean": "chickpeas",
            "original": "2 cups Cooked chickpeas, drained",
            "originalString": "2 cups Cooked chickpeas, drained",
            "originalName": "Cooked chickpeas, drained",
            "amount": 2.0,
            "unit": "cups",
            "meta": [
                "cooked",
                "drained"
            ],
            "metaInformation": [
                "cooked",
                "drained"
            ],
            "measures": {
                "us": {
                    "amount": 2.0,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 473.176,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 11215,
            "aisle": "Produce",
            "image": "garlic.png",
            "consistency": "solid",
            "name": "garlic",
            "nameClean": "garlic",
            "original": "1 tablespoon Garlic, minced",
            "originalString": "1 tablespoon Garlic, minced",
            "originalName": "Garlic, minced",
            "amount": 1.0,
            "unit": "tablespoon",
            "meta": [
                "minced"
            ],
            "metaInformation": [
                "minced"
            ],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                }
            }
        },
        {
            "id": 11233,
            "aisle": "Produce",
            "image": "kale.jpg",
            "consistency": "solid",
            "name": "kale",
            "nameClean": "kale",
            "original": "1 pound Kale or other greens, washed and trimmed",
            "originalString": "1 pound Kale or other greens, washed and trimmed",
            "originalName": "Kale or other greens, washed and trimmed",
            "amount": 1.0,
            "unit": "pound",
            "meta": [
                "washed and trimmed"
            ],
            "metaInformation": [
                "washed and trimmed"
            ],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "lb",
                    "unitLong": "pound"
                },
                "metric": {
                    "amount": 453.592,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        },
        {
            "id": 4053,
            "aisle": "Oil, Vinegar, Salad Dressing",
            "image": "olive-oil.jpg",
            "consistency": "liquid",
            "name": "olive oil",
            "nameClean": "olive oil",
            "original": "1 tablespoon Olive oil",
            "originalString": "1 tablespoon Olive oil",
            "originalName": "Olive oil",
            "amount": 1.0,
            "unit": "tablespoon",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                },
                "metric": {
                    "amount": 1.0,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                }
            }
        },
        {
            "id": 11297,
            "aisle": "Produce;Spices and Seasonings",
            "image": "parsley.jpg",
            "consistency": "solid",
            "name": "parsley",
            "nameClean": "parsley",
            "original": "4 tablespoons Parsley, minced",
            "originalString": "4 tablespoons Parsley, minced",
            "originalName": "Parsley, minced",
            "amount": 4.0,
            "unit": "tablespoons",
            "meta": [
                "minced"
            ],
            "metaInformation": [
                "minced"
            ],
            "measures": {
                "us": {
                    "amount": 4.0,
                    "unitShort": "Tbsps",
                    "unitLong": "Tbsps"
                },
                "metric": {
                    "amount": 4.0,
                    "unitShort": "Tbsps",
                    "unitLong": "Tbsps"
                }
            }
        },
        {
            "id": 1102047,
            "aisle": "Spices and Seasonings",
            "image": "salt-and-pepper.jpg",
            "consistency": "solid",
            "name": "salt and pepper",
            "nameClean": "salt and pepper",
            "original": "Salt and pepper to taste",
            "originalString": "Salt and pepper to taste",
            "originalName": "Salt and pepper to taste",
            "amount": 4.0,
            "unit": "servings",
            "meta": [
                "to taste"
            ],
            "metaInformation": [
                "to taste"
            ],
            "measures": {
                "us": {
                    "amount": 4.0,
                    "unitShort": "servings",
                    "unitLong": "servings"
                },
                "metric": {
                    "amount": 4.0,
                    "unitShort": "servings",
                    "unitLong": "servings"
                }
            }
        },
        {
            "id": 11520420,
            "aisle": "Pasta and Rice",
            "image": "ziti.jpg",
            "consistency": "solid",
            "name": "ziti",
            "nameClean": "ziti",
            "original": "1 pound Ziti, elbow macaroni, twists or bowties",
            "originalString": "1 pound Ziti, elbow macaroni, twists or bowties",
            "originalName": "Ziti, elbow macaroni, twists or bowties",
            "amount": 1.0,
            "unit": "pound",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1.0,
                    "unitShort": "lb",
                    "unitLong": "pound"
                },
                "metric": {
                    "amount": 453.592,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        }
    ],
    "id": 654905,
    "title": "Pasta With Chickpeas and Kale",
    "readyInMinutes": 45,
    "servings": 4,
    "sourceUrl": "http://www.foodista.com/recipe/4BTWKPRC/pasta-with-chickpeas-and-kale",
    "image": "https://spoonacular.com/recipeImages/654905-556x370.jpg",
    "imageType": "jpg",
    "summary": "Pasta With Chickpeas and Kale might be just the main course you are searching for. One serving contains <b>655 calories</b>, <b>27g of protein</b>, and <b>9g of fat</b>. For <b>$1.43 per serving</b>, this recipe <b>covers 43%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista has 1 fans. It is a good option if you're following a <b>dairy free</b> diet. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of bell pepper, ziti, kale, and a handful of other ingredients are all it takes to make this recipe so flavorful. To use up the salt and pepper you could follow this main course with the <a href=\"https://spoonacular.com/recipes/dr-pepper-cake-with-flour-cooked-frosting-539165\">Dr. Pepper Cake with Flour Cooked Frosting</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is spectacular. Similar recipes include <a href=\"https://spoonacular.com/recipes/curried-chickpeas-and-kale-158454\">Curried Chickpeas and Kale</a>, <a href=\"https://spoonacular.com/recipes/creamed-kale-with-chickpeas-608963\">Creamed kale with chickpeas</a>, and <a href=\"https://spoonacular.com/recipes/sauted-chickpeas-with-ham-and-kale-15237\">Sautéed Chickpeas with Ham and Kale</a>.",
    "cuisines": [],
    "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
    ],
    "diets": [
        "dairy free"
    ],
    "occasions": [],
    "winePairing": {
        "pairedWines": [],
        "pairingText": "No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.",
        "productMatches": []
    },
    "instructions": "<ol><li>Set a large pot of water to boil, and add salt. Cut the kale stems into 2-3 inch pieces; chop the leaves coarsely and set aside. Boil the stems until they are nearly tender; then, add the greens. Cook until kale is quite tender but stillbright green. Scoop it out with a slotted spoon, place in a bowl of ice water, and keep pot boiling. When the kale cools, squeeze out excess water, gather it into a mass and chop rather finely. Meanwhile, place olive oil in a large skillet over ve</li><li>Warm the garlic mixture over medium heat, and add the cooked pasta, the chickpeas and the chopped kale.</li><li>Toss well, taste for seasoning, garnish with parsley and serve immediately.</li></ol>",
    "analyzedInstructions": [
        {
            "name": "",
            "steps": [
                {
                    "number": 1,
                    "step": "Set a large pot of water to boil, and add salt.",
                    "ingredients": [
                        {
                            "id": 14412,
                            "name": "water",
                            "localizedName": "water",
                            "image": "water.png"
                        },
                        {
                            "id": 2047,
                            "name": "salt",
                            "localizedName": "salt",
                            "image": "salt.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404752,
                            "name": "pot",
                            "localizedName": "pot",
                            "image": "stock-pot.jpg"
                        }
                    ]
                },
                {
                    "number": 2,
                    "step": "Cut the kale stems into 2-3 inch pieces; chop the leaves coarsely and set aside. Boil the stems until they are nearly tender; then, add the greens. Cook until kale is quite tender but stillbright green. Scoop it out with a slotted spoon, place in a bowl of ice water, and keep pot boiling. When the kale cools, squeeze out excess water, gather it into a mass and chop rather finely. Meanwhile, place olive oil in a large skillet over veWarm the garlic mixture over medium heat, and add the cooked pasta, the chickpeas and the chopped kale.Toss well, taste for seasoning, garnish with parsley and serve immediately.",
                    "ingredients": [
                        {
                            "id": 20421,
                            "name": "cooked pasta",
                            "localizedName": "cooked pasta",
                            "image": "fusilli.jpg"
                        },
                        {
                            "id": 16057,
                            "name": "chickpeas",
                            "localizedName": "chickpeas",
                            "image": "chickpeas.png"
                        },
                        {
                            "id": 14412,
                            "name": "water",
                            "localizedName": "water",
                            "image": "water.png"
                        },
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "localizedName": "olive oil",
                            "image": "olive-oil.jpg"
                        },
                        {
                            "id": 1042027,
                            "name": "seasoning",
                            "localizedName": "seasoning",
                            "image": "seasoning.png"
                        },
                        {
                            "id": 11297,
                            "name": "parsley",
                            "localizedName": "parsley",
                            "image": "parsley.jpg"
                        },
                        {
                            "id": 11215,
                            "name": "garlic",
                            "localizedName": "garlic",
                            "image": "garlic.png"
                        },
                        {
                            "id": 21052,
                            "name": "greens",
                            "localizedName": "greens",
                            "image": "mixed-greens-or-mesclun.jpg"
                        },
                        {
                            "id": 11233,
                            "name": "kale",
                            "localizedName": "kale",
                            "image": "kale.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404636,
                            "name": "slotted spoon",
                            "localizedName": "slotted spoon",
                            "image": "slotted-spoon.jpg"
                        },
                        {
                            "id": 404645,
                            "name": "frying pan",
                            "localizedName": "frying pan",
                            "image": "pan.png"
                        },
                        {
                            "id": 404783,
                            "name": "bowl",
                            "localizedName": "bowl",
                            "image": "bowl.jpg"
                        },
                        {
                            "id": 404752,
                            "name": "pot",
                            "localizedName": "pot",
                            "image": "stock-pot.jpg"
                        }
                    ]
                }
            ]
        }
    ],
    "originalId": null,
    "spoonacularSourceUrl": "https://spoonacular.com/pasta-with-chickpeas-and-kale-654905"
}

```
</details>