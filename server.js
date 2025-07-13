// simple-node-mvc-starter-project ~~ MIT License
// API Server
// Options: NODE_ENV, apiFolder

// Imports
import fs from 'fs';

// Configuration
const config = {
   development: { api: 'build/1-pre/api-server' },
   production:  { api: 'dist/api-server' },
   };

// Setup
const mode =      process.env.NODE_ENV  ?? 'development';
const apiFolder = process.env.apiFolder ?? config[mode].api;
const pkg =       JSON.parse(fs.readFileSync('package.json', 'utf-8'));

// Start
console.info(pkg.name);
console.info(pkg.name.replace(/./g, '='));
console.info(pkg.description);
console.info('Mode:      ', mode);
console.info('API server:', apiFolder);
import('./' + apiFolder + '/api-server.js').then(module => module.api.start());
