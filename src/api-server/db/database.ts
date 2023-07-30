// simple-node-mvc-starter-project ~~ MIT License
// Database

import loki           from 'lokijs';
import { config }     from '../config.js';
import { dataset }    from './dataset.js';
import { JsonObject } from '../../types/global.js';
import { log }        from '../system/log.js';

export type Document = JsonObject;
export type DatabaseState = {
   client:        loki | null,
   db:            Db,
   collectionMap: { [name: string]: Collection<Document> },
   };
export type Db = {
   collection: typeof collection;
   };

const collection = (name: string): Collection<Document> => {
   if (!database.state.db)
      throw Error('[simple] Database not connected.');
   if (!database.state.collectionMap[name])
      throw Error('[simple] Invalid database collection: ' + name);
   return database.state.collectionMap[name]!;
   };

const database = {
   state: <DatabaseState>{
      client:        null,
      db:            { collection: collection },
      collectionMap: {},
      },
   getDb(): Db {
      if (!database.state.client)
         throw Error('[simple] Database not connected.');
      return database.state.db;
      },
   addCollection(data: typeof dataset[0]): void {
      const collection = database.state.client!.addCollection(data.name);
      database.state.collectionMap[data.name] = collection;
      collection.insert(data.documents);
      },
   connect(): Promise<void> {
      if (database.state.client)
         throw Error('[simple] Database already connected.');
      database.state.client = new loki(config.db.name);
      dataset.forEach(database.addCollection);
      log.info('db', 'connect', true);
      return new Promise(resolve => resolve());
      },
   close(): Promise<void> {
      database.state.client =        null;
      database.state.collectionMap = {};
      log.info('db', 'close', true);
      return new Promise(resolve => resolve());
      },
   };

export { database };
