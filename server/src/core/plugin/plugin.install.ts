import PluginClass from './plugin';
import { PluginType } from '../../config/entities';
import { PluginInstallOptions } from '../../utils/interfaces';
import { AvailableState, StateOwner } from '../../config/constants';
import error, { NotFoundError } from '../../utils/decorators/error';

/**
 * Install a plugin.
 * @param {PluginInstallOptions} options - Name of container, version and repo or tag of image
 * @returns {Promise<PluginType>} Resolve with created plugin.
 * @example
 * ````
 * friday.plugin.install({
 *    name: 'Sample plugin',
 *    version: '1.0.0',
 *    repoTag: 'sample:latest',
 * });
 * ````
 */
export default async function install(this: PluginClass, options: PluginInstallOptions): Promise<PluginType> {
  try {
    await this.docker.pull(options.repoTag);
    const container = await this.docker.createContainer({
      name: options.name,
      Image: options.repoTag,
    });

    // TODO: Create a plugin registry (with version and url)
    const plugin = await this.create({
      name: options.name,
      dockerId: container.id,
      enabled: true,
      url: 'TODO',
      version: options.version,
      satelliteId: this.masterId,
    });

    await this.state.set({
      owner: plugin.id!,
      ownerType: StateOwner.PLUGIN,
      value: AvailableState.PLUGIN_INSTALLED,
    });

    await this.docker.start(container.id);

    return plugin;
  } catch (e) {
    if (e.message.includes('HTTP code 404')) {
      throw new NotFoundError({
        name: e.name, message: e.message, cause: e, metadata: options,
      });
    }
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
