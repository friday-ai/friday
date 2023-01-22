import { DeviceAttributes, DeviceRegisterAttributes } from '@friday-ai/shared';
import DeviceClass from './device';

/**
 * Device register
 */
export default async function register(this: DeviceClass, device: DeviceRegisterAttributes): Promise<DeviceAttributes> {
  const newDevice = await this.create(device);

  if (device.capabilities) {
    const newCapabilities = await Promise.all(device.capabilities.map((capability) => this.setCapability(newDevice.id, capability)));
    newDevice.capabilities = newCapabilities;
  }

  return newDevice;
}
