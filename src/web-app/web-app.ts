// simple-node-mvc-starter-project ~~ MIT License
// Web App

// Imports
import { dna }       from 'dna-engine';
import { fetchJson } from 'fetch-json';

// Modules
import { appAction } from './+context/modules/action';
import { appLookup } from './+context/modules/lookup';

const webApp = {
   action: appAction,  //context for HTML: <button data-on-click=webApp.action.getBooks>
   setup(): void {
      fetchJson.enableLogger();
      console.log('simple-node-mvc-starter-project', appLookup.apiServer);
      },
   };

dna.dom.onReady(webApp.setup);

export default webApp;
