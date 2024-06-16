import logger from "@friday-ai/logger";
import type { DeviceCommand } from "@friday-ai/shared";
import type Friday from "../../../../core/friday";

/**
 * Set capability state
 * @param {DeviceCommand} payload - Id of plugin.
 * @returns {Promise<void>}
 * @route friday/master/capability/state
 */
export default async function state(friday: Friday, payload: DeviceCommand) {
  const capability = await friday.device.getCapabilityById(payload.params.capabilityId, "withSettingsAndDevice");

  // Check if this plugin has permission to set this capability
  // if not, do nothing and return
  // TODO: Send error to client
  if (capability.device.pluginId !== payload.emitterId) {
    return;
  }

  friday.event.emit(payload.action, {
    action: payload.action,
    emitter: "plugin",
    emitterId: payload.emitterId,
    capability,
    params: payload.params,
  });
}
