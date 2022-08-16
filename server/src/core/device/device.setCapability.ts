import DeviceCapability from '../../models/device_capability';
import DeviceClass from './device';
import { DeviceCapabilityType } from '../../config/entities';
import { DeviceCapabilityRegisterType } from '../../config/device';
import logger from '../../utils/log';

/**
 * Device capability
 * @param deviceId
 * @param capability
 */
export default async function setCapability(this: DeviceClass, deviceId: string, capability: Omit<DeviceCapabilityRegisterType, 'id'>): Promise<DeviceCapabilityType> {
  const capabilityToCreate: DeviceCapabilityType = {
    deviceId,
    defaultName: capability.defaultName,
    type: capability.type,
  };

  const deviceCapability = await DeviceCapability.create({ ...capabilityToCreate });

  logger.success(
    `New capability registered, type: ${capability.type} for device ${deviceId}`,
  );

  if (capability.settings) {
    await this.setCapabilitySettings(deviceCapability.id!, capability.settings!);
  }

  return <DeviceCapabilityType>deviceCapability.get({ plain: true });
}