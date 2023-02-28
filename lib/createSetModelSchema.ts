import { Db } from "mongodb";
import { getDb } from "./db";

export default function createSetModelSchema(name: string, schema: any) {
  return async () => {
    const db = getDb();
    const collectionExists = await checkCollectionExists(db, name);

    if (collectionExists) {
      updateSchema(db, name, schema);
    } else {
      createCollection(db, name, schema);
    }
  };
}

function updateSchema(db: Db, name: string, schema: any) {
  db.command({
    collMod: name,
    validator: {
      $jsonSchema: schema,
    },
  });
}

function createCollection(db: Db, name: string, schema: any) {
  db.createCollection(name, {
    validator: {
      $jsonSchema: schema,
    },
  });
}

async function checkCollectionExists(db: Db, name: string) {
  const collections = await db.listCollections({ name }).toArray();

  const collectionIndex = collections.findIndex(
    (collection) => collection.name === name
  );

  return collectionIndex !== -1;
}
