import System from '.';
import error from '../../utils/errors/coreError';
/**
 * Start function fo Friday system
 */
export default async function start(this: System) {
  try {
    const userCount = await this.user.getCount();

    // If is the first start, run init funciton
    if (userCount < 1) {
      await this.init();
    }

    this.scheduler.init();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e});
  }
}
