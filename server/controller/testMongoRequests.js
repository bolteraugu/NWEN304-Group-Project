import { MongoClient } from "mongodb";
import { MONGO_URI } from "../../credentials";

main().catch(console.error);

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
  addCookbook(client).finally(() => closeConnection(client));
}