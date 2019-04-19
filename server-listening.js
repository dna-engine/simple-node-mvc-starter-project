// 🧪 Server Listening
// Simple method to return a promose to wait for server ready inside a Mocha specification
// server-listening is just a little helper utility to reduce the amount of boilerplate code needed to startup servers when running multiple Mocha files.
/*
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
*/

const serverListening = {
   setPort(options = null) {
      const defaults = { port: 0, name: 'port', flush: null };  //port 0 to find unused port
      const { port, name, flush } = { ...defaults, ...options };
      process.env[name] = port;
      if (flush)
         delete require.cache[flush];  //flush cache to get fresh server
      },
   ready(server) {
      const executor = (resolve) => server.listening ? resolve() : server.on('listening', resolve);
      return new Promise(executor);
      },
   close(server) {
      const executor = (resolve) => server.close(resolve);
      return new Promise(executor);
      }
   };

module.exports = serverListening;
