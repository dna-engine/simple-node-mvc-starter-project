// Routes
const express = require('express');
const app =     express();

app.post(  '/book',      (request, response) => { controller.book.save(response); });
app.get(   '/book/list', (request, response) => { controller.book.list(response); });
app.get(   '/book/:id',  (request, response) => { controller.book.read(response, request.params.id); });
app.delete('/book/:id',  (request, response) => { controller.book.delete(response, request.params.id); });

const booksDb = {
   1: { id: 1, title: 'Go JavaScript', author: 'Jake' },
   2: { id: 2, title: 'Styling CSS3',  author: 'Abby' },
   3: { id: 3, title: 'Howdy HTML5',   author: 'Ed' }
   };

const restError = {
   notFound:       { error: true, code: 404, message: 'Resource not found' },
   notImplemented: { error: true, code: 501, message: 'Not Implemented' }
   };

const controller = {};

controller.book = {
   save: function(response) {
      response.send(restError.notiImplemented);
      },
   read: function(response, id) {
      response.send(booksDb[+id] || restError.notFound);
      },
   delete: function(response /*, id*/) {
      response.send(restError.notImplemented);
      },
   list: function(response) {
      response.send(restError.notImplemented);
      }
   };

module.exports = app;
