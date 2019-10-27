import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import { GetOptions } from '../../utils/constants';
import error from '../../utils/error';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all triggers.
 * @param {Getoptions} options - Options of the query.
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
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let triggers;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      triggers = await Trigger.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      triggers = await Trigger.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const triggersPlain = <TriggerType[]>triggers.map((trigger) => {
      const triggerPlain = trigger.get({ plain: true });
      return triggerPlain;
    });

    return triggersPlain;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
