// simple-node-mvc-starter-project ~~ MIT License
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { fetchJson } from 'fetch-json';

// Setup
fetchJson.enableLogger();
let baseUrl;
before(() => baseUrl = globalThis.apiBaseUrl);

////////////////////////////////////////////////////////////////////////////////////////////////////
describe('The "/books/3002" REST endpoint', () => {
   const today = new Date().toDateString();

   it('returns the "Styling CSS3" book', (done) => {
      const handleData = (data) => {
         const actual =   data;
         const expected = { id: 3002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
         assertDeepStrictEqual(actual, expected, done);
         };
      fetchJson.get(baseUrl + 'books/3002').then(handleData);
      });

   it('returns the "Styling CSS3" book in an async spec', async () => {
      const data = await fetchJson.get(baseUrl + 'books/3002');
      const actual =   data;
      const expected = { id: 3002, title: 'Styling CSS3', author: 'Abby', retrieved: today };
      assertDeepStrictEqual(actual, expected);
      });

   });
