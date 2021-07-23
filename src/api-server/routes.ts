// simple-node-mvc-starter-project ~~ MIT License
// Routes

import express from 'express';
import { database, Document }  from './db/database.js';
import { restError } from './system/rest-error.js';

export type DocumentBook = {
   id:     number,
   title:  string,
   author: string,
   };

// Model
const model = {
   book(data: Document) {
      return {
         id:        data.id,
         title:     data.title,
         author:    data.author,
         retrieved: new Date().toDateString(),
         };
      },
   };

// Controller
const controller = {
   book: {
      save(_request: express.Request, response: express.Response) {
         const resource = restError.notImplemented('Save book N/A');
         response.json(resource);
         },
      read(request: express.Request, response: express.Response) {
         const id = request.params.id!;
         const db = database.getDb();
         const data = <Document>db.collection('books').findOne({ id: parseInt(id) });
         const resource = data ? model.book(data) : restError.notFound();
         response.json(resource);
         },
      list(_request: express.Request, response: express.Response) {
         const db = database.getDb();
         const resource = db.collection('books').find().map(model.book);
         response.json(resource);
         },
      delete(request: express.Request, response: express.Response) {
         const id = request.params.id!;
         const db = database.getDb();
         const data = db.collection('books').findOne({ id: parseInt(id) });
         const resource = data ?
            restError.notImplemented('Delete book N/A') : restError.notFound();
         response.json(resource);
         },
      },
   };

// Route table
const routes = express();
routes.use(express.json());
routes.get(   '/books',      controller.book.list);
routes.post(  '/books',      controller.book.save);
routes.get(   '/books/:id',  controller.book.read);
routes.delete('/books/:id',  controller.book.delete);
routes.all(   '*',           (_request, response) => response.json(restError.badRequest('No route')));

export { routes };
