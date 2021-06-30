// Mocha Specification Cases

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { fetchJson } from 'fetch-json';
import { serverListening } from 'server-listening';

// Setup
serverListening.setPort();
import { server } from '../server.js';
before(() => serverListening.ready(server));
after(() =>  serverListening.close(server));
const baseUrl = 'http://localhost:' + server.address().port + '/api';

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "/books/1002" REST endpoint', () => {
   const today = new Date().toDateString();

   it('returns the "Styling CSS3" book', (done) => {
      const handleData = (data) => {
         const actual =   data;
         const expected = { id: 1002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
         assertDeepStrictEqual(actual, expected, done);
         };
      fetchJson.get(baseUrl + '/books/1002').then(handleData);
      });

   it('returns the "Styling CSS3" book in an async spec', async () => {
      const data = await fetchJson.get(baseUrl + '/books/1002');
      const actual =   data;
      const expected = { id: 1002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
      assertDeepStrictEqual(actual, expected);
      });

   });
