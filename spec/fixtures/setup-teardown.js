// simple-node-mvc-starter-project ~~ MIT License
// Mocha Setup/Teardown

// Imports
import { api } from       '../../dist/api-server/index.js';
import { serverApp } from '../../dist/api-server/server-app.js';

// Setup
const mochaGlobalSetup = () => {
   const setApiBaseUrl = () => globalThis.apiBaseUrl = `http://localhost:${serverApp.port()}/api/v1/`;
   return api.start().then(setApiBaseUrl);
   };

// Teardown
const mochaGlobalTeardown = () => {
   return api.shutdown();
   };

export { mochaGlobalSetup, mochaGlobalTeardown };
