// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Lookup

import { appConfig } from './config';
import { appUtils }  from './utils';

const appLookup = {
   apiServer: appConfig.apiServers.find(appUtils.isCurrentWebsite)?.api,
   };

export { appLookup };