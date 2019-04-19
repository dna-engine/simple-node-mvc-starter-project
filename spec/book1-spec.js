// Mocha Specification Cases

// Imports
const assert =          require('assert').strict;
const fetchJson =       require('fetch-json');
const serverListening = require('../server-listening');

// Setup
serverListening.setPort({ flush: require.resolve('../server') });
const server = require('../server');
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
const baseUrl = 'http://localhost:' + server.address().port + '/rest';

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "/book/list" REST endpoint', () => {

   it('returns an array', (done) => {
      const handleData = (data) => {
         const actual =   { array: data instanceof Array };
         const expected = { array: true };
         assert.deepEqual(actual, expected);
         done();
         };
      fetchJson.get(baseUrl + '/book/list').then(handleData);
      });

   });
