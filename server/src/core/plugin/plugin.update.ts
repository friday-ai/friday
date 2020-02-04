import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import { default as error, NotFoundError} from '../../utils/errors/coreError';

/**
 * Update a plugin.
 * @param {String} id - Id of plugin
 * @param {PluginType} plugin - A plugin object.
 * @returns {Promise<PluginType>} Resolve with updated plugin.
 * @example
 * ````
 * friday.plugin.update(
 * '40d43cf1-2127-41e9-ac69-9e39636fac20',
 * {
 *   id: '40d43cf1-2127-41e9-ac69-9e39636fac20'
 *   name: 'plugin update'
 * });
 * ````
 */
export default async function update(id: string, plugin: PluginType): Promise<PluginType> {
  try {

    const pluginToUpdate = await Plugin.findByPk(id);

    if (pluginToUpdate === null) {
      throw new NotFoundError({name: 'Update a Plugin', message: 'Plugin not found', metadata: plugin.id});
    }
    pluginToUpdate.update(plugin);
    let pluginToReturn = <PluginType>pluginToUpdate.get({ plain: true });
    return pluginToReturn;

  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: plugin});
  }
}
