import { DcstAttributes, DeviceCommand } from '@friday-ai/shared';
import { EventsType, MqttMessageTypes, TopicsTypes } from '../../config/constants';
import DeviceClass from './device';

/**
 * Device exec
 */
export default async function exec(this: DeviceClass, identifier: string, command: DeviceCommand): Promise<DcstAttributes> {
  const capability = await this.getCapabilityById(identifier);
  const device = await this.getById(capability.deviceId);

  // TDOO: Check if capability is read only
  // TODO: check if action is available for this device
  const message = {
    receiver: device.pluginId,
    message: {
      device: device.externalId ? device.externalId : device.id,
      capability: capability.externalId ? capability.externalId : capability.id,
      method: command.action,
      params: command.params,
    },
    type: MqttMessageTypes.MESSAGE_SEND,
    topic: TopicsTypes.PLUGIN_EXEC,
  };

  const state = await this.setCapabilityState({
    capabilityId: capability.id,
    value: command.params.value,
  });

  this.event.emit(EventsType.MQTT_PUBLISH, message);

  return state;
}
