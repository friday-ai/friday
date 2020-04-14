import System from '.';
import error from '../../utils/errors/coreError';

const env = process.env.NODE_ENV || 'production';

/**
 * Start function fo Friday system
 */
export default async function start(this: System) {
  try {
    const userCount = await this.user.getCount();

    // If is the first start and its not test env, run init funciton
    if (userCount < 1 && env !== 'test') {
      await this.init();
    }

    this.scheduler.init();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e});
  }
}
