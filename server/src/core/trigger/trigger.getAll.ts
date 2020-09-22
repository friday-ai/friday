import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import { GetOptions } from '../../utils/interfaces';
import error from '../../utils/errors/coreError';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all triggers.
 * @param {GetOptions} options - Options of the query.
 * @returns {Promise<TriggerType[]>} Resolve with trigger array.
 * @example
 * ````
 * friday.trigger.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<TriggerType[]> {
  try {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let triggers;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      triggers = await Trigger.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      triggers = await Trigger.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const triggersPlain = <TriggerType[]>triggers.map((trigger) => {
      const triggerPlain = trigger.get({ plain: true });
      return triggerPlain;
    });

    return triggersPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
