// simple-node-mvc-starter-project ~~ MIT License
// Web Application

import { dna } from 'dna.js';
import { fetchJson } from 'fetch-json';
import { prettyPrintJson } from 'pretty-print-json';
import { appConfig } from './config.js';
import { appUtils } from './utils.js';

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type JsonData = Json[] | { [key: string]: Json };

const app = {

   config: appConfig,

   utils: appUtils,

   ui: {
      logApiCall(method: string, path: string): void {
         $('cite >code').text(method);
         $('cite >output').text(app.lookup.apiServer + path);
         },
      handleBooks(data: JsonData): JQuery {
         return $('main >pre >output').hide().html(prettyPrintJson.toHtml(data)).fadeIn();
         },
      },

   action: {
      getBooks(): void {
         const path = 'books';
         app.ui.logApiCall('GET', path);
         fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
         },
      getBook(button: JQuery): void {
         const id = button.data().book;
         const path = 'books/' + id;
         app.ui.logApiCall('GET', path);
         fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
         },
      deleteBook(button: JQuery): void {
         const id = button.data().book;
         const path = 'books/' + id;
         app.ui.logApiCall('DELETE', path);
         fetchJson.delete(app.lookup.apiServer + path).then(app.ui.handleBooks);
         },
      bogus(): void {
         const path = 'bogus';
         app.ui.logApiCall('GET', path);
         fetchJson.get(app.lookup.apiServer + path).then(app.ui.handleBooks);
         },
      },

   lookup: {
      apiServer: appConfig.apiServers.find(appUtils.isCurrentWebsite)?.api,
      },

   setup(): void {
      dna.registerContext('app', app);  //enable dna to see app object even after module bundling
      fetchJson.enableLogger();
      console.log('simple-node-mvc-starter-project', app.lookup.apiServer);
      },

   };

app.setup();

export { app };
