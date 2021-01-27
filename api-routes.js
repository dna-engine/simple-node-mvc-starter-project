// Simple MVC - Routes

// Imports
const express = require('express');
const loki =    require('lokijs');

// Database
const booksData = [
   { id: 1001, title: 'Go JavaScript', author: 'Jake' },
   { id: 1002, title: 'Styling CSS3',  author: 'Abby' },
   { id: 1003, title: 'Howdy HTML5',   author: 'Ed' },
   ];
const db = new loki('libX.db');
const collection = { books: db.addCollection('books') };
collection.books.insert(booksData);

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
const restError = {
   badRequest:     { error: true, code: 400, message: 'Bad request' },
   notFound:       { error: true, code: 404, message: 'Resource not found' },
   teapot:         { error: true, code: 418, message: 'I am a teapot' },
   notImplemented: { error: true, code: 501, message: 'Not Implemented' },
   };

const controller = {};

controller.book = {
   save(request, response) {
      console.log(request);
      const resource = restError.notImplemented;
      response.json(resource);
      },
   read(request, response) {
      const id = request.params.id;
      const data = collection.books.findOne({ id: +id });
      const resource = data ? model.book(data) : restError.notFound;
      response.json(resource);
      },
   list(request, response) {
      const resource = collection.books.find().map(model.book);
      response.json(resource);
      },
   delete(request, response) {
      const id = request.params.id;
      const data = collection.books.findOne({ id: +id });
      const resource = data ? restError.notImplemented : restError.notFound;
      response.json(resource);
      },
   };

// Route table
const app = express();
app.use(express.json());
app.get(   '/book',      controller.book.list);
app.post(  '/book',      controller.book.save);
app.get(   '/book/:id',  controller.book.read);
app.delete('/book/:id',  controller.book.delete);
app.all(   '*',          (request, response) => response.json(restError.badRequest));

module.exports = app;
