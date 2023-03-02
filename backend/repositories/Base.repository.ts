import { Filter, FindOptions, UpdateFilter } from "mongodb";
import { ObjectId } from "bson";
import { getCollection } from "../lib/db.js";

export abstract class BaseRepository<T extends { _id?: ObjectId}> {
  collectionName : string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  get collection() {
    return getCollection<T>(this.collectionName);
  }

  update(query: Filter<T>, update: UpdateFilter<T>) {
    return this.collection.updateOne(query, update, {upsert:true});
  }

  getOne(query: Filter<T>) {
    return this.collection.findOne(query);
  }

  getMany(query: Filter<T>, options?: FindOptions<T>) {
    const many = options
    ? this.collection.find(query, options)
    : this.collection.find(query)
    return many.toArray();
  }

  create(entry: T) {
    // necessary because: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/46375
    //@ts-expect-error
    return this.collection.insertOne(entry);
  }
  
  delete(entry: Filter<T>) {
    return this.collection.deleteOne(entry);
  }
}
