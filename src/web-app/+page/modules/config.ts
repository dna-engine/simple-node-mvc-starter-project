// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Configuration

// Types
export type AppConfig = typeof appConfig;
export type ApiServer = AppConfig['apiServers'][0];

const appConfig = {
   restBase: 'http://localhost:2121/api/v1/',
   apiServers: [
      { website: 'localhost', api: 'http://localhost:2121/api/v1/' },
      ],
   };

export { appConfig };
