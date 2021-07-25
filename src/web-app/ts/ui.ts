// simple-node-mvc-starter-project ~~ MIT License
// Web Application - UI

import { prettyPrintJson } from 'pretty-print-json';
import { app, JsonData }   from './app';

const appUi = {
   logApiCall(method: string, path: string): void {
      $('cite >code').text(method);
      $('cite >output').text(app.lookup.apiServer + path);
      },
   handleBooks(data: JsonData): JQuery {
      return $('main >pre >output').hide().html(prettyPrintJson.toHtml(data)).fadeIn();
      },
   };

export { appUi };
