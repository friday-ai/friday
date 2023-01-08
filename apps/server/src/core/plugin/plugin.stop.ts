import PluginClass from './plugin';
import { AvailableState, StateOwner } from '../../config/constants';

/**
 * Stop a plugin.
 * @param {String} id - Id of plugin.
 * @returns {Promise<any>}
 * @example
 * ````
 * friday.plugin.stop('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
export default async function stop(this: PluginClass, id: string): Promise<any> {
  const plugin = await this.getById(id);
  await this.docker.stop(plugin.dockerId!);

  await this.state.set({
    owner: plugin.id!,
    ownerType: StateOwner.PLUGIN,
    value: AvailableState.PLUGIN_STOPPED,
  });

  return true;
}
