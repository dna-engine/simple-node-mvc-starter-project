// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Lookup

// Modules
import { appConfig } from './config';
import { utils }  from '../../+common/modules/utils';

const appLookup = {
   apiServer: appConfig.apiServers.find(utils.isCurrentWebsite)?.api,
   };

export { appLookup };
