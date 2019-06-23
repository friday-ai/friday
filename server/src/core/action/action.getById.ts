import Action from '../../models/action';
import ActionType from './action.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<ActionType> {
  try {

    let action;

    if (scope !== '' && scope !== null && scope !== undefined) {
      action = await Action.scope(scope).findByPk(id);
    } else {
      action = await Action.findByPk(id);
    }

    if (action === null) {
      throw logger.error('Action not found');
    }

    let actionToReturn = <ActionType>action.get({ plain: true });

    return actionToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
