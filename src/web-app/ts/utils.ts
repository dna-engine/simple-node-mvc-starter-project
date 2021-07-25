// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Utilities

import { ApiServer } from "./config";

const appUtils = {
   isCurrentWebsite(server: ApiServer): boolean {
      return server.website === window.location.hostname;
      },
   };

export { appUtils };
