import Action from '../../models/action';
import ActionType from './action.interface';
import { default as error, NotFoundError } from '../../utils/errors/coreError';

/**
 * Update an action
 * @param {String} id - Id of action.
 * @param {ActionType} action - An action object.
 * @returns {Promise<ActionType>} Resolve with updated action.
 * @example
 * ````
 * friday.action.update(
 * '16c40480-c19f-4ab5-9caf-a93a4fa1e890',
 * {
 *   id: '16c40480-c19f-4ab5-9caf-a93a4fa1e890'
 *   name: 'action update'
 * });
 * ````
 */
export default async function update(id: string, action: ActionType): Promise<ActionType> {
  try {

    const actionToUpdate = await Action.findByPk(id);

    if (actionToUpdate === null) {
      throw new NotFoundError({ name: 'Update an Action', message: 'Action not found', metadata: action.id });
    }

    actionToUpdate.update(action);
    let actionToReturn = <ActionType>actionToUpdate.get({ plain: true });
    return actionToReturn;

  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e, metadata: action });
  }
}
