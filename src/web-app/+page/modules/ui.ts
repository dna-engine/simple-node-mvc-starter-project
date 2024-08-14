// simple-node-mvc-starter-project ~~ MIT License
// Web Application - UI

// Imports
import { prettyPrintJson } from 'pretty-print-json';

// Modules
import { appLookup } from './lookup';
import { JsonData }  from '../../../types/global';

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
      citeElem.querySelector('output')!.textContent = appLookup.apiServer! + path;
      },
   handleBooks(data: JsonData): Element {
      const outputElem = globalThis.document.querySelector('main >pre >output')!;
      outputElem.innerHTML = prettyPrintJson.toHtml(data);
      dna.ui.fadeIn(outputElem, { duration: 1000, reset: true });
      return outputElem;
      },
   };

export { appUi };
