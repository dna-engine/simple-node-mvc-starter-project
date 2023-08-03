// simple-node-mvc-starter-project ~~ MIT License
// Routes

// Imports
import express, { RequestHandler } from 'express';

// Modules
import { bookController } from './book-controller.js';
import { log }            from '../modules/system/log.js';

// Utilities
const logRestRequest: RequestHandler = (request, response, next) => {
   log.info('api-server', 'request', request.ip, request.hostname, request.method, request.path);
   next();
   };

const routeTable = {
   createRoutes(): express.Express {
      const routes = express();
      routes.use(logRestRequest);
      routes.use(express.json());
      routes.get(   '/books',     bookController.list);
      routes.post(  '/books',     bookController.save);
      routes.get(   '/books/:id', bookController.read);
      routes.delete('/books/:id', bookController.delete);
      return routes;
      },
   };

export { routeTable };
