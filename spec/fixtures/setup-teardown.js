// Mocha Specification Suite

// Imports
import { api } from '../../src/api-server/index.js';

// Setup
const mochaGlobalSetup = () => {
   const setApiBaseUrl = (server) =>
      globalThis.apiBaseUrl = `http://localhost:${server.address().port}/api/`;
   return api.start().then(setApiBaseUrl);
   };

// Teardown
const mochaGlobalTeardown = () => {
   return api.shutdown();
   };

export { mochaGlobalSetup, mochaGlobalTeardown };
