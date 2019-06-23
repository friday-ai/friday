import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(trigger: TriggerType): Promise<TriggerType> {
  try {
    const createdTrigger = await Trigger.create(trigger);
    let triggerToReturn = <TriggerType>createdTrigger.get({ plain: true });
    return triggerToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
