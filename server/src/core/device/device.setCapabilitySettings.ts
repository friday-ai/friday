import DeviceCapabilitySettings from '../../models/device_capability_settings';
import DeviceClass from './device';
import { DeviceCapabilitySettingsType } from '../../config/entities';
import { DeviceCapabilitySettingsSchema } from '../../config/device';
import logger from '../../utils/log';

/**
 * Settings of device capability
 * @param capabilityId
 * @param settings
 */
export default async function setCapabilitySettings(
  this: DeviceClass,
  capabilityId: string,
  settings: DeviceCapabilitySettingsSchema,
): Promise<DeviceCapabilitySettingsType> {

  const settingsToCreate: DeviceCapabilitySettingsType = {
    settings,
    capabilityId,
  };

  const capabilitySettings = await DeviceCapabilitySettings.create({ ...settingsToCreate });

  logger.success(
    `New capability settings registered for capability ${capabilityId}`,
  );

  return <DeviceCapabilitySettingsType>capabilitySettings.get({ plain: true });
}
