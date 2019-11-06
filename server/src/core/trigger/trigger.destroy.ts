import Trigger from '../../models/trigger';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Destroy a trigger.
 * @param {String} id - Id of trigger.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.trigger.destroy('db35b9d3-3e6c-4b49-8988-b352494435bc');
 * ````
 */
export default async function destroy(id: string): Promise<void> {
  try {
    const triggerToDelete = await Trigger.findByPk(id);

    if (triggerToDelete === null) {
      throw new NotFoundError({name: 'Destroy a Trigger', message: 'Trigger not found', metadata: id});
    }

    await triggerToDelete.destroy();
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: id});
  }
}
