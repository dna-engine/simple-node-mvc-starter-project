// simple-node-mvc-starter-project ~~ MIT License
// Web Application

// Imports
import { dna }       from 'dna-engine';
import { fetchJson } from 'fetch-json';

// Modules
import { appAction } from './context/modules/action';
import { appConfig } from './context/modules/config';
import { appLookup } from './context/modules/lookup';
import { appUi }     from './context/modules/ui';
import { appUtils }  from './context/modules/utils';

const webApp = {
   config: appConfig,
   utils:  appUtils,
   ui:     appUi,
   action: appAction,
   lookup: appLookup,
   setup(): void {
      fetchJson.enableLogger();
      console.log('simple-node-mvc-starter-project', appLookup.apiServer);
      },
   };

dna.dom.onReady(webApp.setup);

export default webApp;
