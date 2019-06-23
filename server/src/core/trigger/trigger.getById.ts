import Trigger from '../../models/trigger';
import TriggerType from './trigger.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<TriggerType> {
  try {

    let trigger;

    if (scope !== '' && scope !== null && scope !== undefined) {
      trigger = await Trigger.scope(scope).findByPk(id);
    } else {
      trigger = await Trigger.findByPk(id);
    }

    if (trigger === null) {
      throw logger.error('Trigger not found');
    }

    let triggerToReturn = <TriggerType>trigger.get({ plain: true });

    return triggerToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
