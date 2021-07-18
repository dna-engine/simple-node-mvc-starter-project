// Simple MVC - Server

// Imports
import open             from 'open';
import { browserReady } from 'puppeteer-browser-ready';
import { readFileSync } from 'fs';
import { api }          from './src/api-server/index.js';
import { log }          from './src/api-server/log.js';
import { restx }        from './src/api-server/restx.js';

// Setup
const prodMode =  process.env.NODE_ENV === 'production';
const webFolder = process.env.webFolder || 'src/web-app';
const webPort =   process.env.webPort || 0;
const pkg =       JSON.parse(readFileSync('./package.json'));

// Start
console.log(pkg.name);
console.log(pkg.description);
console.log('Mode:', process.env.NODE_ENV ?? 'development');
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   open(http.url);
   };
api.start()
   .then(server => log.info('api-system', 'ready', restx.port(server)))
   .then(() =>     !prodMode && startWebServer());
