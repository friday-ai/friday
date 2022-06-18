import System from './system';
import logger from '../../utils/log';

/**
 * Start function of Friday system
 */
export default async function start(this: System): Promise<string> {
  const userCount = await this.user.count();
  const houseCount = await this.house.count();

  if (userCount >= 1 && houseCount >= 1) {
    // Find id of master
    const satellites = await this.satellite.listAll();
    let master = satellites.filter((s) => s.name === 'Master')[0];

    await this.scheduler.init();

    return master.id!;
  } else {
    logger.info('Friday is not initialized, please complete signup steps');
    return '';
  }
}
