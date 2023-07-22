// simple-node-mvc-starter-project ~~ MIT License
// Web Application

import { dna }       from 'dna-engine';
import { fetchJson } from 'fetch-json';

import { appAction } from './modules/action.js';
import { appConfig } from './modules/config.js';
import { appLookup } from './modules/lookup.js';
import { appUi }     from './modules/ui.js';
import { appUtils }  from './modules/utils.js';

const app = {
   config: appConfig,
   utils:  appUtils,
   ui:     appUi,
   action: appAction,
   lookup: appLookup,
   setup(): void {
      dna.registerContext('app', app);  //enable dna to see app object even after module bundling
      fetchJson.enableLogger();
      console.log('simple-node-mvc-starter-project', appLookup.apiServer);
      },
   };

dna.dom.onReady(app.setup);

export default app;
