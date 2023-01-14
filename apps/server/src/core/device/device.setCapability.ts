import { DeviceCapabilityAttributes, DeviceCapabilityRegisterAttributes } from '@friday/shared';
import DeviceCapability from '../../models/device_capability';
import DeviceClass from './device';
import logger from '../../utils/log';
import { BadParametersError } from '../../utils/decorators/error';
import { exclude } from '../../utils/object';

/**
 * Device capability
 * @param deviceId
 * @param capability
 */
export default async function setCapability(
  this: DeviceClass,
  deviceId: string,
  capability: DeviceCapabilityRegisterAttributes
): Promise<DeviceCapabilityAttributes> {
  if (deviceId === '') {
    throw new BadParametersError({ name: 'Friday set capability', message: 'Device id is empty', metadata: capability });
  }

  const deviceCapabilityObject = await DeviceCapability.create({
    ...{ defaultName: capability.defaultName, type: capability.type },
    ...{ deviceId },
  });

  const deviceCapability = <DeviceCapabilityAttributes>deviceCapabilityObject.get({ plain: true });

  logger.success(`New capability registered, type: ${capability.type} for device ${deviceId}`);

  if (capability.settings) {
    const capabilitySettings = await this.setCapabilitySettings(deviceCapability.id, capability.settings);
    deviceCapability.settings = capabilitySettings;
  }

  return exclude(deviceCapability);
}
