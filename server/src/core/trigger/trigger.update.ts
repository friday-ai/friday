import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(trigger: TriggerType): Promise<TriggerType> {
  try {
    const triggerToUpdate = await Trigger.findByPk(trigger.id);

    if (triggerToUpdate === null) {
      throw logger.error('Trigger not found');
    }
    triggerToUpdate.update(trigger);
    let triggerToReturn = <TriggerType>triggerToUpdate.get({ plain: true });
    return triggerToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
