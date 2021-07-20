// simple-node-mvc-starter-project ~~ MIT License
// API System

import { db }        from './database/db.js';
import { log }       from './system/log.js';
import { serverApp } from './server-app.js';

const api = {
   start() {
      return db.connect()
         .then(() => serverApp.start())
         .then(() => log.info('system', 'ready'));
      },
   shutdown() {
      return serverApp.shutdown()
         .then(() => db.close())
         .then(() => log.info('system', 'shutdown'));
      },
   };

export { api };
