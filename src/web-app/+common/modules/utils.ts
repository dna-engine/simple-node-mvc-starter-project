// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Utilities

// Modules
import { ApiServer } from '../../+context/modules/config';

const utils = {
   isCurrentWebsite(server: ApiServer): boolean {
      return server.website === globalThis.location.hostname;
      },
   };

export { utils };
