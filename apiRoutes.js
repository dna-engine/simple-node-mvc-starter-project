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
const db = new loki('library.db');
const collection = { books: db.addCollection('books') };
collection.books.insert(booksData);

// Model
const model = {
   book(object) {
      return {
         id:        object.id,
         title:     object.title,
         author:    object.author,
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
   save(request) {
      console.log(request);
      const resource = restError.notImplemented;
      return resource;
      },
   read(request) {
      const id = request.params.id;
      const data = collection.books.findOne({ id: +id });
      const resource = data ? model.book(data) : restError.notFound;
      return resource;
      },
   list() {
      const resource = collection.books.find().map(model.book);
      return resource;
      },
   delete(request) {
      const id = request.params.id;
      const data = collection.books.findOne({ id: +id });
      const resource = data ? restError.notImplemented : restError.notFound;
      return resource;
      },
   };

// Route table
const app = express();
const route = (handler) => (request, response) => response.json(handler(request));
app.post(  '/book',      route(controller.book.save));
app.get(   '/book/:id',  route(controller.book.read));
app.get(   '/book',      route(controller.book.list));
app.delete('/book/:id',  route(controller.book.delete));
app.all(   '*',          route(() => restError.badRequest));

module.exports = app;
