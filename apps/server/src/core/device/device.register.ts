import { DeviceAttributes, DeviceCreationAttributes } from '@friday/shared';
import DeviceClass from './device';

/**
 * Device register
 */
export default async function register(this: DeviceClass, device: DeviceCreationAttributes): Promise<DeviceAttributes> {
  const newDevice = await this.create(device);

  if (device.capabilities) {
    device.capabilities.forEach(async (capbility) => {
      await this.setCapability(newDevice.id, capbility);
    });
  }

  return this.getById(newDevice.id, 'withCapabilities');
}
