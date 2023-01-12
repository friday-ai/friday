import { DcstAttributes, DeviceCommand } from '@friday/shared';
import DeviceClass from './device';
import { EventsType, MqttMessageTypes, TopicsTypes } from '../../config/constants';

/**
 * Device exec
 */
export default async function exec(this: DeviceClass, identifier: string, command: DeviceCommand): Promise<DcstAttributes> {
  const capability = await this.getCapabilityById(identifier);
  const device = await this.getById(capability.deviceId);

  // TODO: check if action is available for this device
  const message = {
    receiver: device.pluginId,
    message: {
      device: device.pluginSelector ? device.pluginSelector : device.id,
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
