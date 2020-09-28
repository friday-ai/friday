import System from '.';
import error from '../../utils/errors/coreError';
import { SystemVariablesNames } from '../../utils/constants';
import Variable from '../../models/variable';

const env = process.env.NODE_ENV || 'production';

/**
 * Start function fo Friday system
 */
export default async function start(this: System) {
  try {
    const userCount = await this.user.getCount();

    const fridayVersion = await Variable.findOne({
      where: {
        key: SystemVariablesNames.FRIDAY_VERSION,
      },
    });

    // If is the first start and its not test env, run init function
    if (userCount < 1 && fridayVersion === null && env !== 'test') {
      await this.init();
    }

    await this.scheduler.init();
  } catch (e) {
    throw error(e);
  }
}
