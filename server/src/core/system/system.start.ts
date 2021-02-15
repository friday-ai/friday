import System from '.';
import error, { NotFoundError } from '../../utils/errors/coreError';
import { SystemVariablesNames } from '../../utils/constants';
import Variable from '../../models/variable';

const env = process.env.NODE_ENV || 'production';

/**
 * Start function fo Friday system
 */
export default async function start(this: System): Promise<string> {
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

    // Find id of master
    const satellites = await this.satellite.getAll();
    const master = satellites.filter((s) => s.name === 'Master');

    // In test env, do not throw
    if (master.length === 0 && env !== 'test') {
      throw new NotFoundError({ name: 'System start', message: 'Master satellite not found' });
    }

    // In test env return blank string
    if (env === 'test') {
      return '';
    }

    return master[0].id!;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e,
    });
  }
}
