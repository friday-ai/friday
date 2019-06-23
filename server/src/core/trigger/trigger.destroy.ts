import Trigger from '../../models/trigger';
import Log from '../../utils/log';
const logger = new Log();

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
