// simple-node-mvc-starter-project ~~ MIT License
// API Server

// Imports
import open             from 'open';
import { browserReady } from 'puppeteer-browser-ready';
import { readFileSync } from 'fs';

// Configuration
const config = {
   development: { api: 'build/step1-tsc/api-server', web: 'build/step2-staging/web-app', port: 8000 },
   production:  { api: 'dist/api-server',            web: 'dist/web-app' },
   };

// Setup
const mode =      process.env.NODE_ENV ?? 'development';
const apiFolder = process.env.apiFolder ?? config[mode].api;
const webFolder = process.env.webFolder ?? config[mode].web;
const webPort =   process.env.webPort ??   config[mode].port ?? 0;
const pkg =       JSON.parse(readFileSync('./package.json'));
const browser =   mode === 'development' && !process.env._.includes('nodemon');

// Start
console.log(pkg.name);
console.log(pkg.name.replace(/./g, '='));
console.log(pkg.description);
console.log('Mode:      ', mode);
console.log('API server:', apiFolder);
console.log('Web root:  ', browser ? webFolder : 'n/a');
const startWebServer = async () => {
   const http = await browserReady.startWebServer({ folder: webFolder, port: webPort });
   open(http.url);
   };
import('./' + apiFolder + '/index.js')
   .then(module => module.api.start())
   .then(() => browser && startWebServer());
