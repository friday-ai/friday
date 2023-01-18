import logger from '@friday/logger';
import System from './system';

/**
 * Start function of Friday system
 */
export default async function start(this: System): Promise<string> {
  const userCount = await this.user.count();
  const houseCount = await this.house.count();

  if (userCount >= 1 && houseCount >= 1) {
    // Find id of master
    const satellites = await this.satellite.listAll();
    const master = satellites.filter((s) => s.name === 'Master')[0];

    await this.scheduler.init();

    logger.success('Friday system started');
    return master.id;
  }
  logger.info('Friday is not initialized, please complete signup steps');
  return '';
}
