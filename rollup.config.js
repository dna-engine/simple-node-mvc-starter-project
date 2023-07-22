// simple-node-mvc-starter-project ~~ MIT License
// Rollup Configuration

// Settings
const libraryModules = ['dna-engine', 'fetch-json', 'pretty-print-json'];

// Utilities
const globalize = (map, mod) => { map[mod] = 'globalThis'; return map; };
const globals =   libraryModules.reduce(globalize, {});

const rollup = [
   {
      input:    'build/1-pre/web-app/ts/app.js',
      external: libraryModules,
      output: [
         {
            file:    'build/2-dev/web-app/app.bundle.js',
            name:    'app',
            globals: globals,
            format:  'iife',
         },
      ],
   },
];

export default rollup;
