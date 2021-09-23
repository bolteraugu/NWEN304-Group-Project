import { MONGO_CLIENT } from '../../credentials.js';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_CLIENT, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("CookbookDB").collection("CookbookCollection");
  // perform actions on the collection object
  console.log(collection.dbName);
  console.log(collection.find({}));
  client.close();
});


// export function getCookbook(id) {
//   return fetch(
//       '' // TODO
//   )
//       .then((response) => response.json())
//       .then((data) => {
//           return data;
//       })
//       .catch((e) => {
//           console.error(e);
//       });
// }