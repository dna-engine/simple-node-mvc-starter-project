// Mocha Specification Cases

// Imports
const assert =          require('assert');
const { fetchJson } =   require('fetch-json');
const { serverListening } = require('server-listening');

// Setup
serverListening.setPort();
const server = require('../server');
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
const baseUrl = 'http://localhost:' + server.address().port + '/api';

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "/book" REST endpoint', () => {

   it('returns an array', (done) => {
      const handleData = (data) => {
         const actual =   { array: data instanceof Array };
         const expected = { array: true };
         assert.deepStrictEqual(actual, expected);
         done();
         };
      fetchJson.get(baseUrl + '/book').then(handleData);
      });

   });
