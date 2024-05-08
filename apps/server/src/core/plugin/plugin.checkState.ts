import { AvailableState, EventsType, StateOwner, WebsocketMessageTypes } from "@friday-ai/shared";
import type PluginClass from "./plugin";

/**
 * Check state of a plugin.
 * @param {String} id - Id of plugin.
 * @returns {Promise<string>}
 * @example
 * ````
 * friday.plugin.checkState('833e9fe3-f753-4b2e-8949-ca4684e4f886');
 * ````
 */
export default async function checkState(this: PluginClass, id: string): Promise<string> {
  const plugin = await this.getById(id);

  const state = await this.docker.getContainerState(plugin.dockerId);

  switch (state) {
    case "running":
      await this.state.set({
        owner: plugin.id,
        ownerType: StateOwner.PLUGIN,
        value: AvailableState.PLUGIN_RUNNING,
        last: true,
      });

      this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
        type: WebsocketMessageTypes.PLUGIN_RUNNING,
        message: { id: plugin.id },
      });
      break;

    case "exited":
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
      break;

    default:
      await this.state.set({
        owner: plugin.id,
        ownerType: StateOwner.PLUGIN,
        value: AvailableState.PLUGIN_ERRORED,
        last: true,
      });

      this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
        type: WebsocketMessageTypes.PLUGIN_ERRORED,
        message: { id: plugin.id },
      });
      break;
  }

  return state;
}
