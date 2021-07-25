// simple-node-mvc-starter-project ~~ MIT License
// Rollup Configuration

const libraryModules = ['dna.js', 'fetch-json', 'pretty-print-json'];
const globalize = (map, mod) => { map[mod] = 'globalThis'; return map; };
const globals = libraryModules.reduce(globalize, {});

const rollup = {
   input:    'build/step0-tsc/web-app/ts/app.js',
   external: libraryModules,
   output: [
      {
         name:    'bundle',
         file:    'build/step1-staging/web-app/app.bundle.js',
         globals: globals,
         format:  'iife',
         },
      ],
   };

export default rollup;
