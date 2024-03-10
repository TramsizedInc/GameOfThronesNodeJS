const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

global.dbName = "GotRpg";

async function createDatabase(client, dbName)
{
    const dbObject = await client.db(dbName);
    console.log(`${dbName} was created successfully.`);
}

async function createDoc(client, dbName, collectionName, doc)
{
  const dbObject = await client.db(dbName);
  const collection = dbObject.collection(collectionName);
  const result = await collection.insertOne(doc);
  console.log(
    `The new document was created with the following id: ${result.insertedId}`
  );
}


async function getCharacters() {
  const db = await connectToDatabase();
  const collection = db.collection('Characters');
  return await collection.find({}).toArray();
}

async function insertCharacter(character) {
  const db = await connectToDatabase();
  const collection = db.collection('Characters');
  const lastCharacter = await collection.find().sort({id: -1}).limit(1).toArray();
  const lastId = lastCharacter.length > 0 ? lastCharacter[0].id : 0;
  character.id = lastId + 1;
  await collection.insertOne(character);
}
async function connectToDatabase() {
  await client.connect();
  return client.db(dbName);
}

async function getCharacterById(id) {
  const db = await connectToDatabase();
  const collection = db.collection('Characters');
  const character = await collection.findOne({ id: parseInt(id) });
  return character;
}

  async function deleteCharacterById(id) {
  const db = await connectToDatabase();
  const collection = db.collection('Characters');
  await collection.deleteOne({ id: parseInt(id) });
  }
/* testingDb();   */

module.exports = {
    getCharacters,
    insertCharacter,
    connectToDatabase,
    getCharacterById,
    deleteCharacterById
};