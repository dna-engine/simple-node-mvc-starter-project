// simple-node-mvc-starter-project ~~ MIT License
// Routes

import express       from 'express';
import { db }        from './db.js';
import { restError } from './rest-error.js';

// Model
const model = {
   book(data) {
      return {
         id:        data.id,
         title:     data.title,
         author:    data.author,
         retrieved: new Date().toDateString(),
         };
      },
   };

// Controller
const controller = {};

controller.book = {
   save(request, response) {
      const resource = restError.notImplemented('Save book N/A');
      response.json(resource);
      },
   read(request, response) {
      const id = request.params.id;
      const data = db.collection('books').findOne({ id: parseInt(id) });
      const resource = data ? model.book(data) : restError.notFound('ID: ' + id);
      response.json(resource);
      },
   list(request, response) {
      const resource = db.collection('books').find().map(model.book);
      response.json(resource);
      },
   delete(request, response) {
      const id = request.params.id;
      const data = db.collection('books').findOne({ id: parseInt(id) });
      const resource = data ?
         restError.notImplemented('Delete book N/A') : restError.notFound('ID: ' + id);
      response.json(resource);
      },
   };

// Route table
const routes = express();
routes.use(express.json());
routes.get(   '/books',      controller.book.list);
routes.post(  '/books',      controller.book.save);
routes.get(   '/books/:id',  controller.book.read);
routes.delete('/books/:id',  controller.book.delete);
routes.all(   '*',           (request, response) => response.json(restError.badRequest('No route')));

export { routes };
