// simple-node-mvc-starter-project ~~ MIT License
// Web Application

import { dna }       from 'dna-engine';
import { fetchJson } from 'fetch-json';
import { appAction } from './action.js';
import { appConfig } from './config.js';
import { appUi }     from './ui.js';
import { appUtils }  from './utils.js';

const app = {
   config: appConfig,
   utils:  appUtils,
   ui:     appUi,
   action: appAction,
   lookup: {
      apiServer: appConfig.apiServers.find(appUtils.isCurrentWebsite)?.api,
      },
   setup(): void {
      dna.registerContext('app', app);  //enable dna to see app object even after module bundling
      fetchJson.enableLogger();
      console.log('simple-node-mvc-starter-project', app.lookup.apiServer);
      },
   };

dna.dom.onReady(app.setup);

export { app };
