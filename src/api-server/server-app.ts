// simple-node-mvc-starter-project ~~ MIT License
// API Server App

import cors            from 'cors';
import express         from 'express';
import httpTerminator  from 'http-terminator';
import { AddressInfo } from 'net';
import { Server }      from 'http';
import { config }      from './config.js';
import { log }         from './system/log.js';
import { restError }   from './system/rest-error.js';
import { routes }      from './routes.js';

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
      return (<AddressInfo>serverApp.state.apiServer?.address()).port ?? null;
      },
   status(): string {
      return serverApp.state.apiServer?.listening ? 'active' : 'inactive';
      },
   start(): Promise<Server> {
      log.info('config', 'loaded', config.apiServer.port);
      const apiApp = express();
      apiApp.use(cors());
      apiApp.use(express.json());
      apiApp.use('/api/v1', routes);
      apiApp.all('*', (request, response) => response.json(restError.notFound('No route: ' + request.baseUrl)));
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
