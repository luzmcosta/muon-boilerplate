/**
 * Configures app's logger. Leverages Winston.
 */

import { config, winston } from './winston';

const error = (err) => console.error('Message from Winston:', err),
      logger = new winston.Logger(config);

// Handle uncaught exceptions.
logger.on('error', error);

export default logger;
