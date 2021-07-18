// Logging

import chalk from 'chalk';

const date = () => chalk.blue(new Date().toISOString());
const logger = (type) => (...args) => console.log(date(), type, ...args);

const log = {
   info:  logger(chalk.white('info')),
   error: logger(chalk.red('error')),
   debug: logger(chalk.magenta('debug')),
   };

export { log };
