// simple-node-mvc-starter-project ~~ MIT License
// Database

import loki        from 'lokijs';
import { dataset } from './dataset.js';
import { log }     from '../system/log.js';

const db = {
   state: {
      database:   null,
      collection: {},
      },
   addCollection(data) {
      const collection = db.state.database.addCollection(data.name);
      db.state.collection[data.name] = collection;
      return collection.insert(data.documents);
      },
   connect() {
      if (db.state.instance)
         throw Error('Database already connected.');
      db.state.database = new loki('library.db');
      dataset.forEach(db.addCollection);
      log.info('db', 'connect', true);
      return new Promise(resolve => resolve());
      },
   collection(name) {
      if (!db.state.database)
         throw Error('Database not connected');
      if (!db.state.collection[name])
         throw Error('Invalid database collection: ' + name);
      return db.state.collection[name];
      },
   close() {
      db.state.database =   null;
      db.state.collection = {};
      log.info('db', 'close', true);
      return new Promise(resolve => resolve());
      },
   };

export { db };
