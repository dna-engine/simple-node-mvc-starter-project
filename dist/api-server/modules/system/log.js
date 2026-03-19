import chalk from 'chalk';
const timestamp = () => chalk.blue(new Date().toISOString());
const logger = (level) => (...args) => console.info(timestamp(), level, ...args);
const log = {
    info: logger(chalk.white('info')),
    warn: logger(chalk.yellow('warn')),
    error: logger(chalk.red('error')),
    debug: logger(chalk.magenta('debug')),
};
export { log };
