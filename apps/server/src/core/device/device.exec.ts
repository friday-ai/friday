import { WebsocketMessageTypes, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import { EventsType, MqttMessageTypes, TopicsTypes } from "../../config/constants";
import { BadParametersError } from "../../utils/decorators/error";
import type DeviceClass from "./device";

/**
 * Device exec
 */
export default async function exec(this: DeviceClass, command: DeviceCommand): Promise<DcstAttributes> {
  // Type guard only, if capability wasn't found
  // the process will be stopped before
  if (command.capability === undefined) {
    throw new BadParametersError({ name: "Friday exec", message: "Capability not found", metadata: command.params.capabilityId });
  }

  // TDOO: Check if capability is read only
  // TODO: Check if action is available for this device
  const state = await this.setCapabilityState({
    capabilityId: command.capability.id,
    value: command.params.value,
  });

  if (command.emitter === "client") {
    const message = {
      receiver: command.capability.device.pluginId,
      message: {
        device: command.capability.device.externalId ? command.capability.device.externalId : command.capability.device.id,
        capability: command.capability.externalId ? command.capability.externalId : command.capability.id,
        method: command.action,
        params: command.params,
      },
      type: MqttMessageTypes.MESSAGE_SEND,
      topic: TopicsTypes.PLUGIN_EXEC,
    };

    this.event.emit(EventsType.MQTT_PUBLISH, message);
  } else {
    this.event.emit(EventsType.WEBSOCKET_SEND_ALL, {
      type: WebsocketMessageTypes.CAPABILITY_STATE_EVENT,
      message: { state },
    });
  }

  return state;
}
