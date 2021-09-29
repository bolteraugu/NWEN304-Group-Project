import { MongoClient } from 'mongodb';
import { MONGO_URI } from '../../credentials.js';
import {
  addRecipe,
  closeConnection,
  createCookbook,
  removeRecipe,
} from './mongoDbRequests.js';

main()
  .finally((client) => closeConnection(client))
  .catch(console.error);

/**
 * For testing purposes, can be deleted once we have integrated the front end
 */
export default async function main() {
  console.log('Running main');
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  createCookbook(client)
    .then((id) => {
      addRecipe(client, id, {
        recipe_id: '1234',
        name: 'obiwan',
        ingredients: ['general', 'kenobi', 'cough'],
      });

      addRecipe(client, id, {
        recipe_id: '1',
        name: 'anakin',
        ingredients: ['i', 'have', 'highground'],
      });

      return id;
    })
    .then((id) => removeRecipe(client, id, '1234'));

  return client;
}
