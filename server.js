// Simple MVC - Server

// Imports
import express from 'express';
import { apiRoutes } from './api-routes.js';

// Setup
const webRoot = process.env.webRoot || 'web-root';
const port =    process.env.port || 3000;
const staticWebOptions = {
   setHeaders: (response) => response.setHeader('Connection', 'close'),  //disable keep-alive
   etag:       false,  //always serve fresh files (avoids 304 Not Modified for html files)
   };

// Express app and routes
const app = express();
app.use(express.json());
app.use('/',    express.static(webRoot, staticWebOptions));
app.use('/api', apiRoutes);

// Server startup
const server = app.listen(port);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
server.on('close',     () => console.log('--- Sever shutdown'));

export { server };
