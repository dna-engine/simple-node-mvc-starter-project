// Mocha Specification Cases

// Imports
import assert from 'assert';
import { fetchJson } from 'fetch-json';
import { serverListening } from 'server-listening';

// Setup
serverListening.setPort();
import { server } from '../server.js';
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
