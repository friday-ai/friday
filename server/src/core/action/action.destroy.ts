import Action from '../../models/action';
import Log from '../../utils/log';
const logger = new Log();

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
