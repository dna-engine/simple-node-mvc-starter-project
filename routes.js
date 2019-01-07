// Simple MVC - Routes

// Imports
const express = require('express');
const loki =    require('lokijs');

// Setup
const app = express();

// Database
const booksData = [
   { id: 1001, title: 'Go JavaScript', author: 'Jake' },
   { id: 1002, title: 'Styling CSS3',  author: 'Abby' },
   { id: 1003, title: 'Howdy HTML5',   author: 'Ed' }
   ];
const db = new loki('library.db');
const collection = { books: db.addCollection('books') };
collection.books.insert(booksData);

// Route table
app.post(  '/book',      (request, response) => { controller.book.save(response); });
app.get(   '/book/list', (request, response) => { controller.book.list(response); });
app.get(   '/book/:id',  (request, response) => { controller.book.read(response, request.params.id); });
app.delete('/book/:id',  (request, response) => { controller.book.delete(response, request.params.id); });

const restError = {
   notFound:       { error: true, code: 404, message: 'Resource not found' },
   notImplemented: { error: true, code: 501, message: 'Not Implemented' }
   };

const controller = {};

controller.book = {
   save: (response) => {
      response.send(restError.notiImplemented);
      },
   read: (response, id) => {
      response.send(collection.books.findOne({ id: +id }) || restError.notFound);
      },
   delete: (response, id) => {
      console.log(id);
      response.send(restError.notImplemented);
      },
   list: (response) => {
      response.send(collection.books.find() || restError.notFound);
      }
   };

module.exports = app;
