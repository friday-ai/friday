import System from './system';

/**
 * Shutdown function fo Friday system
 */
export default async function shutdown(this: System) {
  // gracefully shutdown database
  await this.database.closeConnection();
  // exit
  process.exit();
}
