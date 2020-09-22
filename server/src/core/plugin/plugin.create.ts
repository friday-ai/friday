import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import error from '../../utils/errors/coreError';
import setItemState from '../../utils/itemState';
import { AvailableState, StateOwner } from '../../utils/constants';

/**
 * Create a plugin.
 * @param {PluginType} plugin - A plugin object.
 * @returns {Promise<PluginType>} Resolve with created plugin.
 * @example
 * ````
 * friday.plugin.create({
 *    id: '3ee32844-dad1-4d4d-9b2d-fe5f7766854c',
 *    name: 'Sample plugin',
 *    version: '1.0.0',
 *    url: 'sample url',
 *    enabled: true,
 *    satelliteId: '384f3c02-0eec-4497-8a83-c900f1df4db5'
 * });
 * ````
 */
export default async function create(plugin: PluginType): Promise<PluginType> {
  try {
    const createdPlugin = await Plugin.create(plugin);
    const pluginToReturn = <PluginType>createdPlugin.get({ plain: true });
    setItemState(
      pluginToReturn.id!,
      pluginToReturn.id!,
      StateOwner.PLUGIN,
      AvailableState.PLUGIN_WAITING_CONFIGURATION,
    );
    return pluginToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: plugin,
    });
  }
}
