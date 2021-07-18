// Mocha Specification Suite

// Imports
import { apiServerApp } from '../../src/api-server/index.js';

// Setup
const mochaGlobalSetup = () => {
   const setApiBaseUrl = (server) =>
      globalThis.apiBaseUrl = `http://localhost:${server.address().port}/api/`;
   return apiServerApp.start().then(setApiBaseUrl);
   };

// Teardown
const mochaGlobalTeardown = () => {
   return apiServerApp.shutdown();
   };

export { mochaGlobalSetup, mochaGlobalTeardown };
