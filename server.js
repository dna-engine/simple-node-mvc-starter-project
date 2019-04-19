// Simple MVC - Server

// Imports
const express = require('express');
const routes =  require('./routes');

// Express app
const defaultPort = 3000;
const app = express();
app.use(express.static('web-root'));
app.use('/rest', routes);

// Server startup
const server = app.listen(process.env.port || defaultPort);
server.on('listening', () => console.log('--- Server listening on port:', server.address().port));
module.exports = server;
