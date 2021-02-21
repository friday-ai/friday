import PluginClass from './index';
import PluginType from './plugin.interface';
import error from '../../utils/errors/coreError';
import { PluginInstallOptions } from '../../utils/interfaces';
import { AvailableState } from '../../utils/constants';

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
    }, AvailableState.PLUGIN_INSTALLED);

    await this.docker.start(container.id);

    return plugin;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
