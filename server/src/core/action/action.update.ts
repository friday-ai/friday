import Action from '../../models/action';
import ActionType from './action.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name action.update
 * @description Update an action.
 * @param {ActionType} action - An action object.
 * @returns {Promise<ActionType>} Resolve with updated action.
 * @example
 * friday.action.update({
 *   id: '16c40480-c19f-4ab5-9caf-a93a4fa1e890'
 *   name: 'action update'
 * });
 */
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
