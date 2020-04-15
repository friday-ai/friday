import { Op } from 'sequelize';
import State from '../../models/state';
import StateClass from '.';
import error, { BaseCoreError } from '../../utils/errors/coreError';
import { SystemVariablesNames } from '../../utils/constants';

/**
 * Purge states.
 * @example
 * ````
 * friday.state.purge();
 * ````
 */
export default async function purge(this: StateClass) {
  try {
    const { value } = await this.variable.getValue(SystemVariablesNames.HISTORY_STATE_IN_DAYS);
    const stateHistoryInDays = parseInt(value!, 10);

    if (Number.isNaN(stateHistoryInDays)) {
      throw new BaseCoreError({ name: 'Purging states', message: 'History value is not a number', metadata: stateHistoryInDays });
    }

    const now = new Date().getTime();
    const timstampLimit = now - stateHistoryInDays * 24 * 60 * 60 * 1000;

    await State.destroy({
      where: {
        updated_at: {
          [Op.lte]: new Date(timstampLimit),
        },
        last: false,
      },
    });
  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e });
  }
}
