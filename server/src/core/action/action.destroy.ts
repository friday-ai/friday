import Action from '../../models/action';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Destroy an action
 * @param {String} id - Id of action.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.action.destroy('f2d7df99-8b3b-4994-86eb-400a1a951ba0');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const actionToDelete = await Action.findByPk(id);

    if (actionToDelete === null) {
      throw logger.error('Action not found');
    }

    await actionToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
