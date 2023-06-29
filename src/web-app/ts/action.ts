// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Actions

import { fetchJson } from 'fetch-json';
import { app }       from './app';

const appAction = {
   getBooks(): void {
      const path = 'books';
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
      },
   getBook(button: HTMLElement): void {
      const id = button.dataset.book;
      const path = 'books/' + id;
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
      },
   deleteBook(button: HTMLElement): void {
      const id = button.dataset.book;
      const path = 'books/' + id;
      app.ui.logApiCall('DELETE', path);
      fetchJson.delete(app.lookup.apiServer + path).then(app.ui.handleBooks);
      },
   bogus(): void {
      const path = 'bogus';
      app.ui.logApiCall('GET', path);
      fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
      },
   };

export { appAction };
