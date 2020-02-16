// Simple MVC - Routes

// Imports
const express =    require('express');
const loki =       require('lokijs');

// Database
const booksData = [
   { id: 1001, title: 'Go JavaScript', author: 'Jake' },
   { id: 1002, title: 'Styling CSS3',  author: 'Abby' },
   { id: 1003, title: 'Howdy HTML5',   author: 'Ed' },
   ];
const db = new loki('library.db');
const collection = { books: db.addCollection('books') };
collection.books.insert(booksData);

// Model
const model = {
   book(object) {
      return {
         id:     object.id,
         title:  object.title,
         author: object.author,
         };
      },
   };

// Controller

const restError = {
   notFound:       { error: true, code: 404, message: 'Resource not found' },
   notImplemented: { error: true, code: 501, message: 'Not Implemented' },
   };

const controller = {};

controller.book = {
   save(request, response) {
      const resource = restError.notImplemented;
      response.json(resource);
      },
   read(request, response) {
      const id = request.params.id;
      const data = collection.books.findOne({ id: +id });
      const resource = data ? model.book(data) : restError.notFound;
      response.json(resource);
      },
   delete(request, response) {
      const resource = restError.notImplemented;
      response.json(resource);
      },
   list(request, response) {
      const data = collection.books.find();
      const resource = data.map(model.book);
      response.json(resource);
      },
   };

// Route table
const app = express();
app.post(  '/book',      controller.book.save);
app.get(   '/book/list', controller.book.list);
app.get(   '/book/:id',  controller.book.read);
app.delete('/book/:id',  controller.book.delete);

module.exports = app;
