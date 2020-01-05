// Simple MVC - Server

// Imports
const express = require('express');
const routes =  require('./routes');

// Configuration
const defaultPort = 3000;
const staticOptions = { setHeaders: (response) => response.setHeader('Connection', 'close') };  //disable keep-alive

// Express app
const app = express();

// Routes
app.use('/',    express.static('web-root', staticOptions));
app.use('/api', routes);

// Server startup
const server = app.listen(process.env.port || defaultPort);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
module.exports = server;
