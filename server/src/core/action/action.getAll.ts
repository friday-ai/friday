import Action from '../../models/action';
import ActionType from './action.interface';
import error from '../../utils/errors/coreError';
import { GetOptions } from '../../utils/interfaces';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all actions
 * @param {GetOptions} options - Options of the query.
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
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let actions;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      actions = await Action.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      actions = await Action.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const actionsPlain = <ActionType[]>actions.map((action) => {
      const actionPlain = action.get({ plain: true });
      return actionPlain;
    });

    return actionsPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
