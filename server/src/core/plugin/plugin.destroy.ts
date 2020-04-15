import Plugin from '../../models/plugin';
import error, { NotFoundError } from '../../utils/errors/coreError';

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
      throw new NotFoundError({ name: 'Destroy a Plugin', message: 'Plugin not found', metadata: id });
    }

    await pluginToDelete.destroy();
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
