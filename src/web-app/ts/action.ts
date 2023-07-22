// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Actions

import { fetchJson } from 'fetch-json';

import { appLookup } from './lookup.js';
import { appUi } from './ui.js';

const appAction = {
   getBooks(): void {
      const path = 'books';
      appUi.logApiCall('GET', path);
      fetchJson.get(appLookup.apiServer + path).then(appUi.handleBooks);
      },
   getBook(button: HTMLElement): void {
      const id = button.dataset.book;
      const path = 'books/' + id;
      appUi.logApiCall('GET', path);
      fetchJson.get(appLookup.apiServer + path).then(appUi.handleBooks);
      },
   deleteBook(button: HTMLElement): void {
      const id = button.dataset.book;
      const path = 'books/' + id;
      appUi.logApiCall('DELETE', path);
      fetchJson.delete(appLookup.apiServer + path).then(appUi.handleBooks);
      },
   bogus(): void {
      const path = 'bogus';
      appUi.logApiCall('GET', path);
      fetchJson.get(appLookup.apiServer + path).then(appUi.handleBooks);
      },
   };

export { appAction };
