// simple-node-mvc-starter-project ~~ MIT License
// Mocha Specification Suite

// Imports
import puppeteer from 'puppeteer';
import { assertDeepStrictEqual } from 'assert-deep-strict-equal';
import { browserReady } from 'puppeteer-browser-ready';

// Setup
const webRoot = process.env.webRoot ?? 'dist/web-app';
let http;  //fields: server, terminator, folder, url, port, verbose
let web;   //fields: browser, page, response, status, location, title, html, root
before(() => browserReady.startWebServer({ folder: webRoot }).then(info => http = info));
after(() =>  browserReady.shutdownWebServer(http));
const loadWebPage = () => puppeteer.launch()
   .then(browserReady.goto(http.url, { verbose: true }))
   .then(info => web = info);
const closeWebPage = () => browserReady.close(web);

////////////////////////////////////////////////////////////////////////////////
describe.skip('The web page', () => {  //TODO: Investigate loadWebPage timeout --> await page.goto(url)
   before(loadWebPage);
   after(closeWebPage);

   it('has the correct URL', () => {
      const actual =   { status: web.status, url: web.location.href };
      const expected = { status: 200,        url: http.url };
      assertDeepStrictEqual(actual, expected);
      });

   it('title is "Books"', () => {
      const actual =   { title: web.title };
      const expected = { title: 'Books' };
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- node-html-parsed', () => {
      const getTags =  (elems) => [...elems].map(elem => elem.tagName.toLowerCase());
      const actual =   getTags(web.root.querySelectorAll('body >*'));
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   it('body has exactly one header, main, and footer -- page.$$eval()', async () => {
      const getTags =  (elems) => elems.map(elem => elem.nodeName.toLowerCase());
      const actual =   await web.page.$$eval('body >*', getTags);
      const expected = ['header', 'main', 'footer'];
      assertDeepStrictEqual(actual, expected);
      });

   });

////////////////////////////////////////////////////////////////////////////////
describe.skip('The document content', () => {  //TODO: Investigate loadWebPage timeout --> await page.goto(url)
   before(loadWebPage);
   after(closeWebPage);

   it('has a 🚀 traveling to 🪐!', () => {
      const actual =   { '🚀': !!web.html.match(/🚀/g), '🪐': !!web.html.match(/🪐/g) };
      const expected = { '🚀': true,                    '🪐': true };
      assertDeepStrictEqual(actual, expected);
      });

   });
