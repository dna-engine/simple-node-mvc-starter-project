// simple-node-mvc-starter-project ~~ MIT License
// Book Controller

// Imports
import express from 'express';

// Modules
import { database, Document } from '../modules/db/database.js';
import { restError }          from '../modules/system/rest-error.js';

// Types
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
const bookController = {
   save(request: express.Request, response: express.Response): void {
      const resource = restError.notImplemented();
      response.json(resource);
      },
   read(request: express.Request, response: express.Response): void {
      const id =       request.params.id!;
      const db =       database.getDb();
      const data =     db.collection('books').findOne({ id: Number(id) });
      const resource = data ? model.book(data) : restError.notFound();
      response.json(resource);
      },
   list(request: express.Request, response: express.Response): void {
      const db =       database.getDb();
      const resource = db.collection('books').find().map(model.book);
      response.json(resource);
      },
   delete(request: express.Request, response: express.Response): void {
      const id =       request.params.id!;
      const db =       database.getDb();
      const data =     db.collection('books').findOne({ id: Number(id) });
      const resource = data ? restError.notImplemented() : restError.notFound();
      response.json(resource);
      },
   };

export { bookController };
