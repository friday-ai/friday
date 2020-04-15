import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import error from '../../utils/errors/coreError';

/**
 * Create a trigger.
 * @param {TriggerType} trigger - A trigger object.
 * @returns {Promise<TriggerType>} Resolve with created trigger.
 * @example
 * ````
 * friday.trigger.create({
 *    id: '41a0c318-efe0-46c9-885b-545481a32f3d',
 *    name: 'Sample trigger',
 *    description: 'A trigger for a sample :)',
 *    type: AvailableConditions.DEVICE_VALUE,
 *    rules: JSON.stringify({
 *      device: '017538fb-b452-4d53-95e7-8db0bbf0d453',
 *      value: '23'
 *    })
 * });
 * ````
 */
export default async function create(trigger: TriggerType): Promise<TriggerType> {
  try {
    const createdTrigger = await Trigger.create(trigger);
    const triggerToReturn = <TriggerType>createdTrigger.get({ plain: true });
    return triggerToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: trigger,
    });
  }
}
