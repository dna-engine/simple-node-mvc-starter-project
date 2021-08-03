// simple-node-mvc-starter-project ~~ MIT License
// Routes

import express, { RequestHandler } from 'express';
import { bookController } from './controllers/book-controller.js';
import { log } from './system/log.js';
import { restError } from './system/rest-error.js';

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
      routes.get(   '/books',      bookController.list);
      routes.post(  '/books',      bookController.save);
      routes.get(   '/books/:id',  bookController.read);
      routes.delete('/books/:id',  bookController.delete);
      routes.all(   '*',           (request, response) => response.json(restError.badRequest('No route')));
      return routes;
      },
   };

export { routeTable };
