// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Utilities

// Modules
import { ApiServer } from '../../+page/modules/config.js';

const utils = {
   isCurrentWebsite(server: ApiServer): boolean {
      return server.website === globalThis.location.hostname;
      },
   };

export { utils };
