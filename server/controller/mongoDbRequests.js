import { MongoClient } from 'mongodb';

/**
 * Sends a request to MongoDB Atlas to get the cookbook based off the given ID.
 * @param {String} cookbook_id ID which should be contained within the logged in user.
 * @param {MongoClient} client
 * @returns Cookbook | undefined
 */
async function getCookbook(cookbook_id, client) {
  cookbook = undefined;

  const cursor = client.db('CookbookDB').collection('cookbooks').find({
    _id: cookbook_id,
  }); // You can also add another object parameter for projection.

  const results = await cursor.toArray();

  if (results.length > 0) {
    console.log(`Found ${results.length} listing(s):`);
    results.forEach((result, i) => {
      console.log(result);
    });

    if (results.length > 1) {
      throw "THERE SHOULDN'T BE MORE THAN ONE COOKBOOK";
    }

    cookbook = results[0];
  }

  return cookbook;
}

/**
 * Adds a cookbook, which should happen when a new user is created.
 * @param {MongoClient} client
 * @returns ID of the newly created cookbook
 */
async function addCookbook(client) {
  const result = await client
    .db('CookbookDB')
    .collection('cookbooks')
    .insertOne({
      // This can just be an empty object. Seems weird but we just want the newly created ID.
      recipe: {
        name: 'test',
        ingredients: ['deleteme', 'forreal'],
      },
    });

  console.log('Cookbook id:', result.insertedId);
  return result.insertedId;
}

/**
 * TODO Discuss how we generate recipe ids.
 * @param {MongoClient} client
 * @param {String} cookbook_id
 * @param {Recipe} recipe
 * @returns Response
 */
async function addRecipe(client, cookbook_id, recipe) {
  return await client
    .db('CookbookDB')
    .collection('cookbooks')
    .updateOne(
      {
        _id: cookbook_id,
      },
      {
        $push: { recipes: recipe },
      }
    );
}

/**
 * Assumes you know the recipe id.
 * TODO discuss recipe structure and whether we want to find them by an id.
 * @param {MongoClient} client 
 * @param {String} cookbook_id 
 * @param {String} recipe_id 
 * @returns Response
 */
async function removeRecipe(client, cookbook_id, recipe_id) {
  return await client
    .db('CookbookDB')
    .collection('cookbooks')
    .updateOne(
      {
        _id: cookbook_id,
      },
      {
        $pull: { recipes: { recipe_id: recipe_id } },
      },
      { multi: false }
    );
}

/**
 * Should be called at the end to kill the connection.
 * TODO discuss how often this should be called
 *
 * @param {MongoClient} client
 */
export const closeConnection = (client) => {
  console.log('Closing connection....');
  client.close();
};
