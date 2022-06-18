import { Op } from 'sequelize';
import State from '../../models/state';
import StateClass from './state';
import { CoreError } from '../../utils/decorators/error';
import { SystemVariablesNames } from '../../config/constants';

/**
 * Purge states.
 * @example
 * ````
 * friday.state.purge();
 * ````
 */
export default async function purge(this: StateClass) {
  const { value } = await this.variable.getValue(SystemVariablesNames.HISTORY_STATE_IN_DAYS);
  const stateHistoryInDays = parseInt(value!, 10);

  if (Number.isNaN(stateHistoryInDays)) {
    throw new CoreError({ name: 'Purging states', message: 'History value is not a number', metadata: stateHistoryInDays });
  }

  const now = new Date().getTime();
  const timestampLimit = now - stateHistoryInDays * 24 * 60 * 60 * 1000;

  await State.sequelize?.getQueryInterface().bulkDelete('state', {
    updatedAt: {
      [Op.lte]: new Date(timestampLimit),
    },
  });

  return;
}
