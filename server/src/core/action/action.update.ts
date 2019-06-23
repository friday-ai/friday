import Action from '../../models/action';
import ActionType from './action.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(action: ActionType): Promise<ActionType> {
  try {

    const actionToUpdate = await Action.findByPk(action.id);

    if (actionToUpdate === null) {
      throw logger.error('Action not found');
    }
    actionToUpdate.update(action);
    let actionToReturn = <ActionType>actionToUpdate.get({ plain: true });
    return actionToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
