// simple-node-mvc-starter-project ~~ MIT License
// Database

// Imports
import loki from 'lokijs';

// Modules
import { config }     from '../../config.js';
import { dataset }    from './dataset.js';
import { JsonObject } from '../../../types/global.js';
import { log }        from '../system/log.js';

// Types
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
   if (!<unknown>database.state.db)
      throw new Error('[simple] Database not connected.');
   const documents = database.state.collectionMap[name];
   if (!documents)
      throw new Error('[simple] Invalid database collection: ' + name);
   return documents;
   };

const database = {
   state: <DatabaseState>{
      client:        null,
      db:            { collection: collection },
      collectionMap: {},
      },
   getDb(): Db {
      if (!database.state.client)
         throw new Error('[simple] Database not connected.');
      return database.state.db;
      },
   addCollection(data: typeof dataset[number]): Collection<Document> {
      const collection = database.state.client!.addCollection(data.name);
      database.state.collectionMap[data.name] = <Collection<Document>>collection;
      return <Collection<Document>>collection.insert(data.documents);
      },
   connect(): Promise<void> {
      if (database.state.client)
         throw new Error('[simple] Database already connected.');
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
