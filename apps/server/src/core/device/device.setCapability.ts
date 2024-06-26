import logger from "@friday-ai/logger";
import type { DeviceCapabilityAttributes, DeviceCapabilityRegisterAttributes } from "@friday-ai/shared";
import DeviceCapability from "../../models/device_capability";
import { BadParametersError } from "../../utils/decorators/error";
import { exclude } from "../../utils/object";
import type DeviceClass from "./device";

/**
 * Device capability
 * @param deviceId
 * @param capability
 */
export default async function setCapability(
  this: DeviceClass,
  deviceId: string,
  capability: DeviceCapabilityRegisterAttributes,
): Promise<DeviceCapabilityAttributes> {
  if (deviceId === "") {
    throw new BadParametersError({ name: "Friday set capability", message: "Device id is empty", metadata: capability });
  }

  const deviceCapabilityObject = await DeviceCapability.create({
    ...{ defaultName: capability.defaultName, type: capability.type, externalId: capability.externalId },
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
