import { PluginAttributes, StateOwner, WebsocketMessageTypes, AvailableState } from '@friday-ai/shared';
import logger from '@friday-ai/logger';
import PluginClass from './plugin';
import { PluginInstallOptions } from '../../utils/interfaces';
import { EventsType } from '../../config/constants';
import error, { NotFoundError } from '../../utils/decorators/error';

/**
 * Install a plugin.
 * @param {PluginInstallOptions} options - Name of container, version and repo or tag of image
 * @returns {Promise<PluginAttributes>} Resolve with created plugin.
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
export default async function install(this: PluginClass, options: PluginInstallOptions): Promise<PluginAttributes> {
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
      lastHeartbeat: new Date(),
    });

    await this.state.set({
      owner: plugin.id,
      ownerType: StateOwner.PLUGIN,
      value: AvailableState.PLUGIN_INSTALLED,
      last: true,
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
        name: e.name,
        message: e.message,
        cause: e,
        metadata: options,
      });
    }
    throw error({
      name: e.name,
      message: e.message,
      cause: e,
      metadata: options,
    });
  }
}
