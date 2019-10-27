import Action from '../../models/action';
import ActionType from './action.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Get action by id
 * @param {String} id - Id of action.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<ActionType>} Resolve with action.
 * @example
 * ````
 * friday.device.getById('0480d9b4-0968-491a-8693-b1788ae0dc7d', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<ActionType> {
  try {

    let action;

    if (scope !== '' && scope !== null && scope !== undefined) {
      action = await Action.scope(scope).findByPk(id);
    } else {
      action = await Action.findByPk(id);
    }

    if (action === null) {
      throw new NotFoundError({name: 'Get Action by Id', message: 'Action not found', metadata: id});
    }

    let actionToReturn = <ActionType>action.get({ plain: true });

    return actionToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
