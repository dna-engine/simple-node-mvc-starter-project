// simple-node-mvc-starter-project ~~ MIT License
// Rollup Configuration

// Settings
const libraryModules = ['dna-engine', 'fetch-json', 'pretty-print-json'];
const ignoreList =     ['CIRCULAR_DEPENDENCY', 'MISSING_NAME_OPTION_FOR_IIFE_EXPORT'];

// Utilities
const globalize = (map, mod) => { map[mod] = 'globalThis'; return map; };
const globals =   libraryModules.reduce(globalize, {});
const onWarn =    (warning, warn) => ignoreList.includes(warning.code) || warn(warning);

const rollup = [
   {
      input:    'build/1-tsc/web-app/ts/app.js',
      external: libraryModules,
      onwarn:   onWarn,
      output: [
         {
            file:    'build/2-dev/web-app/app.bundle.js',
            globals: globals,
            format:  'iife',
         },
      ],
   },
];

export default rollup;
