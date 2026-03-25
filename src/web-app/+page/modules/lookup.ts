// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Lookup

// Modules
import { appConfig } from './config.js';
import { utils }  from '../../+common/modules/utils.js';

const appLookup = {
   apiServer: appConfig.apiServers.find(utils.isCurrentWebsite)?.api,
   };

export { appLookup };
