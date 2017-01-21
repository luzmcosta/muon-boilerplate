/*
 * Represents our logger of choice, Winston, and its configuration.
 *
 * Compatible with ES5+.
 */

import moment from 'moment';
import winston from 'winston';

let config = {},
    util = {};

util = {
  timestamp() {
    return moment().toISOString();
  },
  color(level) {
    return winston.config.colorize(level, level.toUpperCase());
  },
  formatter(options) {
    const metadata = options.meta && Object.keys(options.meta).length
                     ? JSON.stringify(options.meta)
                     : '';

    // Return string will be passed to logger.
    return `${options.timestamp()} ${util.color(options.level)} ` +
           `${options.message || ''}${metadata}`;
  },
};

config = {
  exitOnError: false,
  transports: [
    new winston.transports.File({
      colorize: false,
      exitOnError: false,
      filename: './logs/app.log',
      handleExceptions: true,
      json: true,
      level: 'info',
      maxFiles: 5,
      // 5MB
      maxsize: 5242880,
      timestamp: util.timestamp,
      formatter: util.formatter,
    }),
    new winston.transports.Console({
      colorize: true,
      exitOnError: false,
      handleExceptions: true,
      json: false,
      level: 'debug',
      timestamp: util.timestamp,
      formatter: util.formatter,
    })
  ],
};

export { winston, config };
