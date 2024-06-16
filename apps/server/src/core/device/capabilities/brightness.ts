import { DevicesActions, checkBrightnessRange, checkIfIsANumber, type DcstAttributes, type DeviceCommand } from "@friday-ai/shared";
import { BadParametersError } from "../../../utils/decorators/error";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setBrightness: {
    actions: [DevicesActions.SET_BRIGHTNESS],
  },
};

/**
 * Brightness device capability
 * @param args
 */
export async function setBrightness(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  // Type guard only, if capability wasn't found
  // the process will be stopped before
  if (args.capability === undefined) {
    throw new BadParametersError({ name: "Friday set capability", message: "Capability not found", metadata: args.params.capabilityId });
  }

  // Check if is valid value
  checkIfIsANumber(args.params.value);
  checkBrightnessRange(args.params.value, args.capability.settings.settings);

  return this.exec(args);
}
