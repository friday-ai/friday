import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Update a trigger.
 * @param {TriggerType} trigger - A trigger object.
 * @returns {Promise<TriggerType>} Resolve with updated trigger.
 * @example
 * ````
 * friday.trigger.update({
 *   id: 'fc5700be-8ed2-4540-a59e-a8572d8c41c5'
 *   name: 'trigger update'
 * });
 * ````
 */
export default async function update(trigger: TriggerType): Promise<TriggerType> {
  try {
    const triggerToUpdate = await Trigger.findByPk(trigger.id);

    if (triggerToUpdate === null) {
      throw new NotFoundError({name: 'Update a Trigger', message: 'Trigger not found', metadata: trigger.id});
    }
    triggerToUpdate.update(trigger);
    let triggerToReturn = <TriggerType>triggerToUpdate.get({ plain: true });
    return triggerToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: trigger});
  }
}
