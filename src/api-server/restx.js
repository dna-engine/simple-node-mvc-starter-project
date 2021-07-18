// simple-node-mvc-starter-project ~~ MIT License
// REST Utilities

const restx = {
   port(server)   { return server.address().port; },
   status(server) { return server.listening ? 'active' : 'inactive'; },
   };

export { restx };
