import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Get a plugin by id.
 * @param {String} id - Id of plugin.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<PluginType>} Resolve with plugin.
 * @example
 * ````
 * friday.plugin.getById('8d77999c-4b4f-447d-9fb3-851985981f1e', 'full');
 * ````
 */
export default async function getById(id: string, scope?: string): Promise<PluginType> {
  try {
    let plugin;

    if (scope !== '' && scope !== null && scope !== undefined) {
      plugin = await Plugin.scope(scope).findByPk(id);
    } else {
      plugin = await Plugin.findByPk(id);
    }

    if (plugin === null) {
      throw new NotFoundError({ name: 'Get Plugin by Id', message: 'Plugin not found', metadata: id });
    }

    const pluginToReturn = <PluginType>plugin.get({ plain: true });

    return pluginToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
