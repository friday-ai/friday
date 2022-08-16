import DeviceClass from './device';
import { DeviceCapabilityType } from '../../config/entities';
import { EventsType, MqttMessageTypes, TopicsTypes } from '../../config/constants';
import { DeviceCommandType } from '../../utils/interfaces';

/**
 * Device exec
 */
export default async function exec(
  this: DeviceClass,
  capability: DeviceCapabilityType,
  command: DeviceCommandType,
): Promise<void> {
  const device = await this.getById(capability.deviceId!);

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

  this.event.emit(EventsType.MQTT_PUBLISH, message);

  return;
}
