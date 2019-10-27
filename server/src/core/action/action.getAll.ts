import Action from '../../models/action';
import ActionType from './action.interface';
import error from '../../utils/error';
import { GetOptions } from '../../utils/constants';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all actions
 * @param {Getoptions} options - Options of the query.
 * @returns {Promise<ActionType[]>} Resolve with action array.
 * @example
 * ````
 * friday.action.getAll({
 *     scope: '',
 *     take: 20,
 *     skip: 0
 *   });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<ActionType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let actions;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      actions = await Action.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      actions = await Action.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const actionsPlain = <ActionType[]>actions.map((action) => {
      const actionPlain = action.get({ plain: true });
      return actionPlain;
    });

    return actionsPlain;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: options});
  }
}
