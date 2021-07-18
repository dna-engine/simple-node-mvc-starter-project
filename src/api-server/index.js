// simple-node-mvc-starter-project ~~ MIT License
// API System

import { db }        from './db.js';
import { log }       from './log.js';
import { serverApp } from './server-app.js';

const api = {
   start() {
      return db.connect().then(() => serverApp.start());
      },
   shutdown() {
      const bye = () =>  log.info('system', 'shutdown-end');
      return serverApp.shutdown().then(db.close).then(bye);
      },
   };

export { api };
