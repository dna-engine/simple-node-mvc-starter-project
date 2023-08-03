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
console.log(pkg.name);
console.log(pkg.name.replace(/./g, '='));
console.log(pkg.description);
console.log('Mode:      ', mode);
console.log('API server:', apiFolder);
import('./' + apiFolder + '/api-server.js').then(module => module.api.start());
