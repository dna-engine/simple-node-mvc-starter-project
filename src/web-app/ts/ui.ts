// simple-node-mvc-starter-project ~~ MIT License
// Web Application - UI

import { prettyPrintJson } from 'pretty-print-json';
import { JsonData } from '../../models/types';
import { app }   from './app';

const appUi = {
   // <main>
   //    ...
   //    <p>
   //       <cite><code></code> <output></output></cite>
   //    </p>
   //    <pre><output></output></pre>
   // </main>
   logApiCall(method: string, path: string): void {
      const citeElem = globalThis.document.querySelector('main cite')!;
      citeElem.querySelector('code')!.textContent =   method;
      citeElem.querySelector('output')!.textContent = app.lookup.apiServer + path;
      },
   handleBooks(data: JsonData): Element {
      const outputElem = globalThis.document.querySelector('main >pre >output')!;
      outputElem.innerHTML = prettyPrintJson.toHtml(data);
      dna.ui.fadeIn(outputElem, { duration: 1000, reset: true });
      return outputElem;
      },
   };

export { appUi };
