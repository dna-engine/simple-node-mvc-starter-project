// simple-node-mvc-starter-project ~~ MIT License
// Logging

import chalk from 'chalk';

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';
export type Loggable = string | boolean | number | null | undefined;

const timestamp = (): string => chalk.blue(new Date().toISOString());
const logger = (level: string) => (...args: Loggable[]) => console.log(timestamp(), level, ...args);

const log = {
   info:  logger(chalk.white('info')),
   warn:  logger(chalk.yellow('warn')),
   error: logger(chalk.red('error')),
   debug: logger(chalk.magenta('debug')),
   };

export { log };
