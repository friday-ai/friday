import System from '.';
import error from '../../utils/errors/coreError';
import logger from '../../utils/log';

/**
 * Start function of Friday system
 */
export default async function start(this: System): Promise<string> {
  try {
    const userCount = await this.user.getCount();
    const houseCount = await this.house.getCount();

    if (userCount >= 1 && houseCount >= 1) {
      // Find id of master
      const satellites = await this.satellite.getAll();
      let master = satellites.filter((s) => s.name === 'Master')[0];

      await this.scheduler.init();

      return master.id!;
    } else {
      logger.info('Friday is not initialized, please complete signup steps');
      return '';
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e,
    });
  }
}
