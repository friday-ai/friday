import Action from '../../models/action';
import error, { NotFoundError } from '../../utils/errors/coreError';

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
      throw new NotFoundError({ name: 'Destroy an Action', message: 'Action not found', metadata: id });
    }

    await actionToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
