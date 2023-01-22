import logger from '@friday-ai/logger';
import System from './system';

/**
 * Shutdown function fo Friday system
 */
export default async function shutdown(this: System) {
  logger.warning('Friday system shutdown');
  // gracefully shutdown database
  await this.database.closeConnection();
  // exit
  process.exit();
}
