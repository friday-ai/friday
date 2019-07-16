import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name plugin.create
 * @description Create a plugin.
 * @param {PluginType} plugin - A plugin object.
 * @returns {Promise<PluginType>} Resolve with created plugin.
 * @example
 * friday.plugin.create({
 *    id: '3ee32844-dad1-4d4d-9b2d-fe5f7766854c',
 *    name: 'Sample plugin',
 *    version: '1.0.0',
 *    url: 'sample url',
 *    enabled: true,
 *    satelliteId: '384f3c02-0eec-4497-8a83-c900f1df4db5'
 * });
 */
export default async function create(plugin: PluginType): Promise<PluginType> {
  try {
    const createdPlugin = await Plugin.create(plugin);
    let pluginToReturn = <PluginType>createdPlugin.get({ plain: true });
    return pluginToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
