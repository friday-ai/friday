import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a trigger.
 * @param {String} id - Id of trigger
 * @param {TriggerType} trigger - A trigger object.
 * @returns {Promise<TriggerType>} Resolve with updated trigger.
 * @example
 * ````
 * friday.trigger.update(
 * 'fc5700be-8ed2-4540-a59e-a8572d8c41c5',
 * {
 *   id: 'fc5700be-8ed2-4540-a59e-a8572d8c41c5'
 *   name: 'trigger update'
 * });
 * ````
 */
export default async function update(id: string, trigger: TriggerType): Promise<TriggerType> {
  try {
    const triggerToUpdate = await Trigger.findByPk(id);

    if (triggerToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Trigger', message: 'Trigger not found', metadata: trigger.id });
    }
    await triggerToUpdate.update(trigger);
    const triggerToReturn = <TriggerType>triggerToUpdate.get({ plain: true });
    return triggerToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: trigger,
    });
  }
}
