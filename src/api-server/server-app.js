// simple-node-mvc-starter-project ~~ MIT License
// Server Application

import cors           from 'cors';
import express        from 'express';
import httpTerminator from 'http-terminator';
import { apiRoutes }  from './api-routes.js';
import { log }        from './log.js';
import { restError }  from './rest-error.js';
import { restx }      from './restx.js';

const serverApp = {
   state: {
      apiServer:  null,
      terminator: null,
      },
   start(options) {
      const defaults = { port: 2121 };
      const settings = { ...defaults, ...options };
      const apiApp = express();
      apiApp.use(cors());
      apiApp.use(express.json());
      apiApp.use('/api', apiRoutes);
      apiApp.all('*', (request, response) => response.json(restError.notFound('No route')));
      let done;
      const apiServer = apiApp.listen(settings.port);
      serverApp.state.apiServer = apiServer;
      serverApp.state.terminator = httpTerminator.createHttpTerminator({ server: apiServer });
      apiServer.on('listening', () => log.info('api-server', 'listening', restx.status(apiServer), restx.port(apiServer)));
      apiServer.on('listening', () => done(apiServer));
      apiServer.on('close',     () => log.info('api-server', 'shutdown-start', restx.status(apiServer)));
      process.on('SIGINT', serverApp.shutdown);
      return new Promise(resolve => done = resolve);
      },
   shutdown() {
      const bye = () =>
         log.info('api-server', 'shutdown-end', restx.status(serverApp.state.apiServer));
      return serverApp.state.terminator.terminate().then(bye);
      },
   };

export { serverApp };
