import DeviceCapabilitySettings from '../../models/device_capability_settings';
import DeviceClass from './device';
import { DeviceCapabilitySettingsType } from '../../config/entities';
import { DeviceCapabilitySettingsSchema } from '../../config/device';
import logger from '../../utils/log';
import { BadParametersError } from '../../utils/decorators/error';

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

  // TODO: check if settings is valid for capability
  if (capabilityId === '') {
    throw new BadParametersError({ name: 'Friday set capability settings', message: 'Capability id is empty', metadata: settings });
  }

  let capabilitySettings = await DeviceCapabilitySettings.findOne({
    where: {
      capabilityId: capabilityId,
    },
  });

  // If old settings exist, update it
  if (capabilitySettings !== null) {
    capabilitySettings.settings = settings;
    await capabilitySettings.save();
  } else {
    capabilitySettings = await DeviceCapabilitySettings.create({ ...settingsToCreate });
  }

  logger.success(
    `New capability settings registered for capability ${capabilityId}`,
  );

  return <DeviceCapabilitySettingsType>capabilitySettings.get({ plain: true });
}
