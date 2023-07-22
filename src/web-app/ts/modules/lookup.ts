// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Lookup

import { appConfig } from './config.js';
import { appUtils }  from './utils.js';

const appLookup = {
   apiServer: appConfig.apiServers.find(appUtils.isCurrentWebsite)?.api,
   };

export { appLookup };
