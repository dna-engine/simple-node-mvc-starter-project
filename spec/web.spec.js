// simple-node-mvc-starter-project ~~ MIT License
// Mocha Specification Suite

// Imports
import puppeteer from 'puppeteer';
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { browserReady } from 'puppeteer-browser-ready';

// Setup
const webRoot = process.env.webRoot || 'dist/web-app';
let http;  //fields: server, terminator, folder, url, port, verbose
let web;   //fields: browser, page, response, status, location, title, html, $
const loadWebPage =  async () => web = await puppeteer.launch().then(browserReady.goto(http.url));
const closeWebPage = async () => await browserReady.close(web);
before(async () => http = await browserReady.startWebServer({ folder: webRoot }));
after(async () =>  await browserReady.shutdownWebServer(http));

////////////////////////////////////////////////////////////////////////////////
describe('The web page', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL', () => {
      const actual =   { status: web.status, url: web.location.href };
      const expected = { status: 200,        url: http.url };
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- Cheerio', () => {
      const actual =   web.$('body >*').toArray().map(elem => elem.name);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('has a body with exactly one header, main, and footer -- page.evaluate()', async () => {
      const actual = await web.page.evaluate(() => {
         const elems = globalThis.document.querySelectorAll('body >*');
         return [...elems].map(elem => elem.nodeName.toLowerCase());
         });
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe('The document content', () => {
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!web.html.match(/🚀/g), '🪐': !!web.html.match(/🪐/g) };
      const expected = { '🚀': true,                    '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
