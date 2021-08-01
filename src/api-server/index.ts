// simple-node-mvc-starter-project ~~ MIT License
// Startup REST Server and Database

import { database }  from './db/database.js';
import { log }       from './system/log.js';
import { serverApp } from './server-app.js';

const api = {
   start(): Promise<void> {
      log.info('system', 'initialize');
      return database.connect()
         .then(() => serverApp.start())
         .then(() => log.info('system', 'ready'));
      },
   shutdown(): Promise<void> {
      return serverApp.shutdown()
         .then(() => database.close())
         .then(() => log.info('system', 'shutdown'));
      },
   };

export { api };
