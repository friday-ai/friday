import Action from '../../models/action';
import ActionType from './action.interface';
import { default as error, NotFoundError } from '../../utils/errors/coreError';

/**
 * Update an action
 * @param {ActionType} action - An action object.
 * @returns {Promise<ActionType>} Resolve with updated action.
 * @example
 * ````
 * friday.action.update({
 *   id: '16c40480-c19f-4ab5-9caf-a93a4fa1e890'
 *   name: 'action update'
 * });
 * ````
 */
export default async function update(action: ActionType): Promise<ActionType> {
  try {

    const actionToUpdate = await Action.findByPk(action.id);

    if (actionToUpdate === null) {
      throw new NotFoundError({ name: 'Update an Action', message: 'Action not found', metadata: action.id });
    }

    await Action.update(action, {returning: true, where: { id: action.id } });
    const actionUpdated = await Action.findByPk(action.id);
    const actionToReturn = <ActionType>actionUpdated!.get({ plain: true });
    return actionToReturn;

  } catch (e) {
    throw error({ name: e.name, message: e.message, cause: e, metadata: action });
  }
}
