// Simple MVC - Routes

// Imports
import cors           from 'cors';
import express        from 'express';
import httpTerminator from 'http-terminator';
import { apiRoutes }  from './api-routes.js';
import { db }         from './db.js';
import { log }        from './log.js';
import { restError }  from './rest-error.js';
import { restx }      from './restx.js';

const apiServerApp = {

   state: {
      apiServer:  null,
      terminator: null,
      },

   start(options) {
      const defaults = { port: 2121 };
      const settings = { ...defaults, ...options };

      // Express app and routes
      const apiApp = express();
      apiApp.use(cors());
      apiApp.use(express.json());
      apiApp.use('/api', apiRoutes);
      apiApp.all('*', (request, response) => response.json(restError.notFound('No route')));
      let done;

      const startServer = () => {
         const apiServer = apiApp.listen(settings.port);
         apiServerApp.state.apiServer = apiServer;
         apiServerApp.state.terminator = httpTerminator.createHttpTerminator({ server: apiServer });
         apiServer.on('listening', () => log.info('api-server', 'listening', restx.status(apiServer), restx.port(apiServer)));
         apiServer.on('listening', () => done(apiServer));
         apiServer.on('close',     () => log.info('api-server', 'shutdown-start', restx.status(apiServer)));
         process.on('SIGINT', apiServerApp.shutdown);
         };
      db.connect().then(startServer);
      return new Promise(resolve => done = resolve);
      },

   shutdown() {
      const apiServer =  apiServerApp.state.apiServer;
      const terminator = apiServerApp.state.terminator;
      const bye = () =>  log.info('api-server', 'shutdown-end', restx.status(apiServer));
      return terminator.terminate().then(db.close).then(bye);
      },

   };

export { apiServerApp };
