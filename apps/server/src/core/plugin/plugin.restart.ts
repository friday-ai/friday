import logger from '@friday-ai/logger';
import { AvailableState, EventsType, StateOwner, WebsocketMessageTypes } from '@friday-ai/shared';
import PluginClass from './plugin';

/**
 * Restart a plugin.
 * @param {String} id - Id of plugin.
 * @returns {Promise<boolean>}
 * @example
 * ````
 * friday.plugin.restart('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
export default async function restart(this: PluginClass, id: string): Promise<boolean> {
  try {
    const plugin = await this.getById(id);
    await this.docker.restart(plugin.dockerId);

    await this.state.set({
      owner: plugin.id,
      ownerType: StateOwner.PLUGIN,
      value: AvailableState.PLUGIN_STOPPED,
      last: true,
    });

    this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
      type: WebsocketMessageTypes.PLUGIN_STOPPED,
      message: { id: plugin.id },
    });

    // Ensure a check was performed to know the state of plugin
    setTimeout(() => {
      this.checkState(id);
    }, 2000);

    return true;
  } catch (error) {
    if (error.message.includes('Container not found')) {
      logger.warning('Container not exist');

      await this.state.set({
        owner: id,
        ownerType: StateOwner.PLUGIN,
        value: AvailableState.PLUGIN_ERRORED,
        last: true,
      });

      this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
        type: WebsocketMessageTypes.PLUGIN_ERRORED,
        message: { id },
      });

      return false;
    }

    throw error;
  }
}
