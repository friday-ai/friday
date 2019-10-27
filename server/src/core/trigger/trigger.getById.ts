import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Get a trigger by id.
 * @param {String} id - Id of trigger.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<TriggerType>} Resolve with trigger.
 * @example
 * ````
 * friday.trigger.getById('7f4bc504-16bd-4a78-aab1-48243237ab5c', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<TriggerType> {
  try {

    let trigger;

    if (scope !== '' && scope !== null && scope !== undefined) {
      trigger = await Trigger.scope(scope).findByPk(id);
    } else {
      trigger = await Trigger.findByPk(id);
    }

    if (trigger === null) {
      throw new NotFoundError({name: 'Get Trigger by Id', message: 'Trigger not found', metadata: id});
    }

    let triggerToReturn = <TriggerType>trigger.get({ plain: true });

    return triggerToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
