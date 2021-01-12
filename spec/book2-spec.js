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
describe('The "/book/1002" REST endpoint', () => {
   const today = new Date().toDateString();

   it('returns the "Styling CSS3" book', (done) => {
      const handleData = (data) => {
         const actual =   data;
         const expected = { id: 1002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
         assert.deepStrictEqual(actual, expected);
         done();
         };
      fetchJson.get(baseUrl + '/book/1002').then(handleData);
      });

   it('returns the "Styling CSS3" book in an async spec', async () => {
      const data = await fetchJson.get(baseUrl + '/book/1002');
      const actual =   data;
      const expected = { id: 1002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
      assert.deepStrictEqual(actual, expected);
      });

   });
