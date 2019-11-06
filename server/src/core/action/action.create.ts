import Action from '../../models/action';
import ActionType from './action.interface';
import error from '../../utils/errors/coreError';

/**
 * Create an action
 * @param {ActionType} action - An action object.
 * @returns {Promise<ActionType>} Resolve with created action.
 * @example
 * ````
 * friday.action.create({
 *    id: '53dd38a4-f462-4021-a82f-92aca2aa8dea',
 *    name: 'action sample',
 *    description: 'action sample description',
 *    type: ActionsType.LIGHT_TURN_ON,
 *    subType: '',
 *    variableKey: 'action sample variable key',
 *    variableValue: 'action sample variable value',
 *    sceneId: '8a7823aa-8ec9-4169-b5b9-40ad52804f67'
 * });
 * ````
 */
export default async function create(action: ActionType): Promise<ActionType> {
  try {
    const createdAction = await Action.create(action);
    let actionToReturn = <ActionType>createdAction.get({ plain: true });
    return actionToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: action});
  }
}
