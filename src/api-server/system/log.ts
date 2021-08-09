// simple-node-mvc-starter-project ~~ MIT License
// Logging

import chalk from 'chalk';

const timestamp = (): string => chalk.blue(new Date().toISOString());
const logger = (type: string) => (...args: unknown[]) => console.log(timestamp(), type, ...args);

const log = {
   info:  logger(chalk.white('info')),
   warn:  logger(chalk.yellow('warn')),
   error: logger(chalk.red('error')),
   debug: logger(chalk.magenta('debug')),
   };

export { log };
