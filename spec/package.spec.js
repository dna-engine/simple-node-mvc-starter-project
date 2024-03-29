// simple-node-mvc-starter-project ~~ MIT License
// Mocha Specification Suite

// Imports
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import fs from 'fs';

////////////////////////////////////////////////////////////////////////////////
describe('The "dist" folder', () => {

   it('contains a backend folder and a frontend folder', () => {
      const actual =   fs.readdirSync('dist').sort();
      const expected = ['api-server', 'web-app'];
      assertDeepStrictEqual(actual, expected);
      });

   });
