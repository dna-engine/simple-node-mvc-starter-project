// simple-node-mvc-starter-project ~~ MIT License
// Web Application - Configuration

export type AppConfig = typeof appConfig;
export type ApiServer = AppConfig['apiServers'][0];

const appConfig = {
   restBase: 'http://localhost:2121/api/',
   apiServers: [
      { website: 'localhost', api: 'http://localhost:2121/api/' },
      ],
   };

export { appConfig };
