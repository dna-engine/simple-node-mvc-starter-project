// simple-node-mvc-starter-project ~~ MIT License
// API Server App

import cors           from 'cors';
import express        from 'express';
import httpTerminator from 'http-terminator';
import { log }        from './system/log.js';
import { restError }  from './system/rest-error.js';
import { routes }     from './routes.js';

const serverApp = {
   state: {
      apiServer:  null,
      terminator: null,
      },
   port() {
      return serverApp.state.apiServer.address().port;
      },
   status() {
      return serverApp.state.apiServer.listening ? 'active' : 'inactive';
      },
   start(options) {
      const defaults = { port: 2121 };
      const settings = { ...defaults, ...options };
      const apiApp = express();
      apiApp.use(cors());
      apiApp.use(express.json());
      apiApp.use('/api', routes);
      apiApp.all('*', (request, response) => response.json(restError.notFound('No route')));
      let done;
      const apiServer = apiApp.listen(settings.port);
      serverApp.state.apiServer = apiServer;
      serverApp.state.terminator = httpTerminator.createHttpTerminator({ server: apiServer });
      apiServer.on('listening', () => log.info('api-server', 'listening', serverApp.status(), serverApp.port()));
      apiServer.on('listening', () => done(apiServer));
      apiServer.on('close',     () => log.info('api-server', 'shutdown-start', serverApp.status()));
      process.on('SIGINT', serverApp.shutdown);
      return new Promise(resolve => done = resolve);
      },
   shutdown() {
      const bye = () => log.info('api-server', 'shutdown-end', serverApp.status());
      return serverApp.state.terminator.terminate().then(bye);
      },
   };

export { serverApp };
