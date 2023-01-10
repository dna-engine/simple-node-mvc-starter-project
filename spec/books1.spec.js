// simple-node-mvc-starter-project ~~ MIT License
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { fetchJson } from 'fetch-json';

// Setup
fetchJson.enableLogger();
let baseUrl;
before(() => baseUrl = globalThis.apiBaseUrl);

////////////////////////////////////////////////////////////////////////////////
describe('The "/books" REST endpoint', () => {

   it('returns an array', (done) => {
      const handleData = (data) => {
         const actual =   { array: data instanceof Array };
         const expected = { array: true };
         assertDeepStrictEqual(actual, expected, done);
         };
      fetchJson.get(baseUrl + 'books').then(handleData);
      });

   });
