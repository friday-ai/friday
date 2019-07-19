import Plugin from '../../models/plugin';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Destroy a plugin.
 * @param {String} id - Id of plugin.
 * @returns {Promise<void>}
 * @example
 * ````
 * friday.plugin.destroy('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
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
