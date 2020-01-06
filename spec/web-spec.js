// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const serverListening = require('server-listening');
const { JSDOM } =       require('jsdom');

// Setup
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
const url = 'http://localhost:' + server.address().port + '/';
const jsdomOptions = { resources: 'usable', runScripts: 'dangerously' };
let dom;
before(() => serverListening.ready(server)
   .then(() => JSDOM.fromURL(url, jsdomOptions))
   .then(serverListening.jsdomOnLoad)
   .then((jsdom) => dom = jsdom)
   );
after(() => serverListening.close(server)
   .then(serverListening.jsdomCloseWindow(dom))
   );

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {

   it('has the correct URL -> ' + url, () => {
      const actual =   { url: dom.window.location.href };
      const expected = { url: url };
      assert.deepEqual(actual, expected);
      });

   it('has exactly one header, main, and footer', () => {
      const actual =   {
         header: dom.window.$('body >header').length,
         main:   dom.window.$('body >main').length,
         footer: dom.window.$('body >footer').length
         };
      const expected = { header: 1, main: 1, footer: 1 };
      assert.deepEqual(actual, expected);
      });

   });
