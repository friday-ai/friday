import Trigger from '../../models/trigger';
import Log from '../../utils/log';
const logger = new Log();

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
      throw logger.error('Trigger not found');
    }

    await triggerToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
