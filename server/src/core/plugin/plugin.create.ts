import Plugin from '../../models/plugin';
import PluginType from './plugin.interface';
import PluginClass from './index';
import error from '../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../utils/constants';

/**
 * Create a plugin.
 * @param {PluginType} plugin - A plugin object.
 * @param {AvailableState} state - A state of plugin
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
 * }, AvailableState.PLUGIN_RUNNING);
 * ````
 */
export default async function create(this: PluginClass, plugin: PluginType, state: AvailableState): Promise<PluginType> {
  try {
    const createdPlugin = await Plugin.create(plugin);
    const pluginToReturn = <PluginType>createdPlugin.get({ plain: true });

    await this.state.set({
      owner: pluginToReturn.id!,
      ownerType: StateOwner.PLUGIN,
      value: state,
    });

    return pluginToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: plugin,
    });
  }
}
