import logger from "@friday-ai/logger";
import type { DcsAttributes, DcsCreationAttributes, DeviceCapabilitySettingsSchema } from "@friday-ai/shared";
import DeviceCapabilitySettings from "../../models/device_capability_settings";
import { BadParametersError } from "../../utils/decorators/error";
import type DeviceClass from "./device";

/**
 * Settings of device capability
 * @param capabilityId
 * @param settings
 */
export default async function setCapabilitySettings(
  this: DeviceClass,
  capabilityId: string,
  settings: DeviceCapabilitySettingsSchema,
): Promise<DcsAttributes> {
  const settingsToCreate: DcsCreationAttributes = {
    settings,
    capabilityId,
  };

  // TODO: check if settings is valid for capability
  if (capabilityId === "") {
    throw new BadParametersError({ name: "Friday set capability settings", message: "Capability id is empty", metadata: settings });
  }

  let capabilitySettings = await DeviceCapabilitySettings.findOne({
    where: {
      capabilityId,
    },
  });

  // If old settings exist, update it
  if (capabilitySettings !== null) {
    capabilitySettings.settings = settings;
    await capabilitySettings.save();
  } else {
    capabilitySettings = await DeviceCapabilitySettings.create({ ...settingsToCreate, ...{ capabilityId } });
  }

  logger.success(`New capability settings registered for capability ${capabilityId}`);

  return <DcsAttributes>capabilitySettings.get({ plain: true });
}
