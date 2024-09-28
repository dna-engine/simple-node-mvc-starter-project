// simple-node-mvc-starter-project ~~ MIT License
// API Server App

// Imports
import { AddressInfo } from 'net';
import { Server }      from 'http';
import cors            from 'cors';
import express         from 'express';
import httpTerminator  from 'http-terminator';

// Modules
import { config }     from '../config.js';
import { log }        from './system/log.js';
import { restError }  from './system/rest-error.js';
import { routeTable } from '../controllers/route-table.js';

// Types
export type ServerAppState = {
   apiServer:  Server | null,
   terminator: httpTerminator.HttpTerminator | null,
   };

const serverApp = {
   state: <ServerAppState>{
      apiServer:  null,
      terminator: null,
      },
   port(): number | null {
      const apiServer = serverApp.state.apiServer;
      return apiServer ? (<AddressInfo>apiServer.address()).port : null;
      },
   status(): string {
      return serverApp.state.apiServer?.listening ? 'active' : 'inactive';
      },
   start(): Promise<Server> {
      log.info('config', 'loaded', config.apiServer.port);
      const handleInvalidRoute = (request: express.Request, response: express.Response) => {
         if (request.url !== '/favicon.ico')
            log.warn('api-server', 'invalid-route', request.url);
         response.json(restError.notFound('No route.'));
         };
      const apiApp = express();
      apiApp.use(cors());
      apiApp.use(express.json());
      apiApp.use('/api/v1', routeTable.createRoutes());
      apiApp.all('*', handleInvalidRoute);
      let done: (server: Server) => void;
      const apiServer = apiApp.listen(config.apiServer.port);
      serverApp.state.apiServer = apiServer;
      serverApp.state.terminator = httpTerminator.createHttpTerminator({ server: apiServer });
      apiServer.on('listening', () => log.info('api-server', 'listening', serverApp.status(), serverApp.port()));
      apiServer.on('listening', () => done(apiServer));
      apiServer.on('close',     () => log.info('api-server', 'shutdown-start', serverApp.status()));
      process.on('SIGINT', serverApp.shutdown);
      return new Promise(resolve => done = resolve);
      },
   shutdown(): Promise<void> {
      const bye = () => log.info('api-server', 'shutdown-end', serverApp.status());
      return serverApp.state.terminator!.terminate().then(bye);
      },
   };

export { serverApp };
