import { MongoClient, ObjectId } from 'mongodb';
import { CLIENT_PORT, MONGO_URI, SERVER_PORT } from '../../credentials.js';
import {
  addRecipe,
  connectToMongoDb,
  createCookbook,
  getCookbook,
  removeRecipe,
} from './mongoDbRequests.js';

main();

/**
 * For testing purposes, can be deleted once we have integrated the front end
 */
export default async function main() {
  console.log('Running main');
  console.log(SERVER_PORT, CLIENT_PORT);

  const client = await connectToMongoDb();

  const myBook = await getCookbook('6153d4d7cf358e3c2fd48904', client);

  console.log(myBook);

  client.close();

  // Test functions here, change these to whatever you wanna try do (e.g delete, update etc.).
  // createCookbook(client)
  //   .then((id) => {
  //     addRecipe(client, id, {
  //       recipe_id: '1234',
  //       name: 'obiwan',
  //       ingredients: ['general', 'kenobi', 'cough'],
  //     });

  //     addRecipe(client, id, {
  //       recipe_id: '1',
  //       name: 'anakin',
  //       ingredients: ['i', 'have', 'highground'],
  //     });

  //     return id;
  //   })
  //   .then((id) => removeRecipe(client, id, '1234'));
}
