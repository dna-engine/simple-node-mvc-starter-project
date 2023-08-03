// simple-node-mvc-starter-project ~~ MIT License
// Startup REST Server and Database

// Modules
import { database }  from './modules/db/database.js';
import { log }       from './modules/system/log.js';
import { serverApp } from './modules/server-app.js';

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
