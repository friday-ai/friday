import PluginClass from './plugin';
import { PluginType } from '../../config/entities';
import { PluginInstallOptions } from '../../utils/interfaces';
import { AvailableState, EventsType, StateOwner, WebsocketMessageTypes } from '../../config/constants';
import error, { NotFoundError } from '../../utils/decorators/error';
import logger from '../../utils/log';

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
 *    satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f
 * });
 * ````
 */
export default async function install(this: PluginClass, options: PluginInstallOptions): Promise<PluginType> {
  try {
    logger.info(`Installing plugin ${options.name}`);

    this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
      type: WebsocketMessageTypes.PLUGIN_INSTALLING,
      message: {},
    });

    const cb = (stream: string) => {
      this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
        type: WebsocketMessageTypes.PLUGIN_INSTALLING,
        message: stream,
      });
    };

    await this.docker.pull(options.repoTag, cb);

    const container = await this.docker.createContainer({
      name: options.name,
      Image: options.repoTag,
    });

    logger.info(`Plugin ${options.name} installed`);

    // TODO: Create a plugin registry (with version and url)
    const plugin = await this.create({
      name: options.name,
      dockerId: container.id,
      enabled: true,
      url: 'TODO',
      version: options.version,
      satelliteId: options.satelliteId,
    });

    await this.state.set({
      owner: plugin.id!,
      ownerType: StateOwner.PLUGIN,
      value: AvailableState.PLUGIN_INSTALLED,
    });

    this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
      type: WebsocketMessageTypes.PLUGIN_INSTALLED,
      message: { plugin },
    });

    await this.docker.start(container.id);

    logger.success(`Plugin ${options.name} started`);

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
