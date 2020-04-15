import System from '.';
import error from '../../utils/errors/coreError';

/**
 * Shutdown function fo Friday system
 */
export default async function shutdown(this: System) {
  try {
    // gracefully shutdown database
    await this.database.closeConnection();
    // exit
    process.exit();
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
