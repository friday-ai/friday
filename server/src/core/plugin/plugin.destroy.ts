import Plugin from '../../models/plugin';
import Log from '../../utils/log';
const logger = new Log();

export default async function destroy(id: string): Promise<void> {
  try {
    const pluginToDelete = await Plugin.findByPk(id);

    if (pluginToDelete === null) {
      throw logger.error('Plugin not found');
    }

    await pluginToDelete.destroy();
  } catch (e) {
    throw logger.error(e);
  }
}
