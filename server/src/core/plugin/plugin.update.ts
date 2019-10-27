import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import { default as error, NotFoundError} from '../../utils/error';

/**
 * Update a plugin.
 * @param {PluginType} plugin - A plugin object.
 * @returns {Promise<PluginType>} Resolve with updated plugin.
 * @example
 * ````
 * friday.plugin.update({
 *   id: '40d43cf1-2127-41e9-ac69-9e39636fac20'
 *   name: 'plugin update'
 * });
 * ````
 */
export default async function update(plugin: PluginType): Promise<PluginType> {
  try {

    const pluginToUpdate = await Plugin.findByPk(plugin.id);

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
