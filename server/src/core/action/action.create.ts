import Action from '../../models/action';
import ActionType from './action.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(action: ActionType): Promise<ActionType> {
  try {
    const createdAction = await Action.create(action);
    let actionToReturn = <ActionType>createdAction.get({ plain: true });
    return actionToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
