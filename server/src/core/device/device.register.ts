import DeviceClass from './device';
import { DeviceType } from '../../config/entities';
import { DeviceRegisterType } from '../../config/device';

/**
 * Device register
 */
export default async function register(this: DeviceClass, device: DeviceRegisterType): Promise<DeviceType> {
  const deviceToCreate : DeviceType = {
    defaultManufacturer: device.defaultManufacturer,
    defaultName: device.defaultName,
    defaultModel: device.defaultModel,
    deviceId: device.deviceId,
    pluginId: device.pluginId,
  };

  const newDevice = await this.create(deviceToCreate);

  if (device.capabilities) {
    for (const capability of device.capabilities) {
      await this.setCapability(newDevice.id!, capability);
    }
  }

  return this.getById(newDevice.id!, 'withCapabilities');
}
