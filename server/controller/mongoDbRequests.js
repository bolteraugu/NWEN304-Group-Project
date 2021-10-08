import { MongoClient } from 'mongodb';
import { ObjectId } from 'bson';

/**
 * Creates the client and opens a connection.
 *
 * ? Lets discuss when this function should be called.
 * @returns {Promise<MongoClient>}
 */
export const connectToMongoDb = async () => {
  const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client.connect();
};

/**
 * Sends a request to MongoDB Atlas to get the cookbook based off the given ID.
 * @param {String} cookbook_id ID which should be contained within the logged in user.
 * @param {MongoClient} client
 * @returns {Promise<Cookbook>} Cookbook | undefined
 */
export async function getCookbook(cookbook_id, client) {
  let cookbook = undefined;

  const cursor = client
    .db('CookbookDB')
    .collection('cookbooks')
    .find({
      _id: new ObjectId(cookbook_id),
    }); // You can also add another object parameter for projection.

  const results = await cursor.toArray();

  if (results.length > 0) {
    if (results.length > 1) {
      throw "THERE SHOULDN'T BE MORE THAN ONE COOKBOOK";
    }

    cookbook = results[0];
  }

  return cookbook; // TODO Put an invalid response code if its undefined
}

/**
 * Adds a cookbook, which should happen when a new user is created.
 * @param {MongoClient} client
 * @returns ID of the newly created cookbook
 */
 export async function createCookbook(client) {
  const result = await client
    .db('CookbookDB')
    .collection('cookbooks')
    .insertOne({
      recipes: [],
    });

  return result.insertedId;
}

/**
 * Deletes a cookbook. This is used when a user is deleted, their cookbook is deleted as well.
 * @param client
 * @param cookbookID
 * @returns {Promise<*>}
 */
export async function deleteCookbook(client, cookbookID) {
  return await client
      .db('CookbookDB')
      .collection('cookbooks')
      .deleteOne({ _id: new ObjectId(cookbookID) });
}

export async function checkRecipe(client, cookbookID, recipe) {
  let cookbook = await getCookbook(cookbookID, client);
  let foundRecipe = false;
  for (let i = 0; i < cookbook.recipes.length; i++) {
    if (cookbook.recipes[i].id === parseInt(recipe)) {
      foundRecipe = true;
    }
  }

  return foundRecipe;
}

/**
 * @param {MongoClient} client
 * @param {String} cookbook_id
 * @param {Recipe} recipe
 * @returns Response
 */
export async function addRecipe(client, cookbook_id, recipe) {
  return await client
    .db('CookbookDB')
    .collection('cookbooks')
    .updateOne(
      {
        _id: new ObjectId(cookbook_id),
      },
      {
        $push: { recipes: recipe },
      }
    );
}

export async function addKeywordSearch(client, keywordQuery, userId) {
  return await client
    .db('CookbookDB')
    .collection('users')
    .updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $push: { recentSearches: { $each: [keywordQuery], $slice: -10 } },
      }
    );
}

export async function getKeywordSearch(client, userId) {
  let cursor = client
    .db('CookbookDB')
    .collection('users')
    .find({
      _id: new ObjectId(userId),
    });

  const results = await cursor.toArray();
  return results[0].recentSearches;
}

/**
 * Assumes you know the recipe id.
 * @param {MongoClient} client
 * @param {String} cookbook_id
 * @param {String} recipe_id
 * @returns Response
 */
export async function removeRecipe(client, cookbook_id, recipe_id) {
  return await client
    .db('CookbookDB')
    .collection('cookbooks')
    .updateOne(
      {
        _id: new ObjectId(cookbook_id),
      },
      {
        $pull: { recipes: { id: parseInt(recipe_id) } },
      },
      { multi: false }
    );
}

/**
 * Assumes you know the recipe id.
 * TODO discuss recipe structure and whether we want to find them by an id.
 * @param {MongoClient} client
 * @param {String} recipeID
 * @returns Response
 */
 export async function getRecipe(client, cookbookID, recipeID) {
  const cookbook = await getCookbook(cookbookID, client);
  let recipe = null;

  for (let i = 0; i < cookbook.recipes.length; i++) {
    if (cookbook.recipes[i].id === parseInt(recipeID)) {
      recipe = cookbook.recipes[i];
      break;
    }
  }
    return recipe;
}

/**
 * Deletes a user by their ID.
 * @param client
 * @param userId
 * @returns {Promise<*>}
 */
export async function deleteUser(client, userId) {
  return await client
    .db('CookbookDB')
    .collection('users')
    .deleteOne({ _id: new ObjectId(userId) });
}
