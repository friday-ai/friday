import {
  DevicesActions,
  checkBoolValue,
  checkIfIsANumber,
  checkRGB,
  checkSaturationRange,
  type DcstAttributes,
  type DeviceCommand,
} from "@friday-ai/shared";

import { BadParametersError } from "../../../utils/decorators/error";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  color: {
    actions: [DevicesActions.COLOR],
  },
  coldWarm: {
    actions: [DevicesActions.COLD, DevicesActions.WARM],
  },
  colorTemp: {
    actions: [DevicesActions.COLOR_TEMP],
  },
  white: {
    actions: [DevicesActions.WHITE],
  },
  saturation: {
    actions: [DevicesActions.SATURATION],
  },
};

/**
 * color device capability
 * @param args
 */
async function color(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  const rgb = args.params.value;
  checkRGB(rgb);

  return this.exec(args);
}

/**
 * coldWarm device capability
 * @param args
 *
 * if args.value = 1 then cold method else warm method
 */
async function coldWarm(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkBoolValue(args.params.value);

  return this.exec({
    action: args.params.value ? DevicesActions.COLD : DevicesActions.WARM,
    emitter: args.emitter,
    params: args.params,
    capability: args.capability,
    emitterId: args.emitterId,
  });
}

/**
 * colorTemp device capability
 * @param args
 *
 */
async function colorTemp(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  checkIfIsANumber(args.params.value);
  return this.exec(args);
}

/**
 * white device capability
 * @param args
 *
 */
async function white(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  return this.exec({
    action: DevicesActions.WHITE,
    emitter: args.emitter,
    capability: args.capability,
    emitterId: args.emitterId,
    params: { capabilityId: args.params.capabilityId, value: "255, 255, 255" as never },
  });
}

async function saturation(this: DeviceClass, args: DeviceCommand): Promise<DcstAttributes> {
  // Type guard only, if capability wasn't found
  // the process will be stopped before
  if (args.capability === undefined) {
    throw new BadParametersError({ name: "Friday set capability", message: "Capability not found", metadata: args.params.capabilityId });
  }

  checkSaturationRange(args.params.value, args.capability.settings.settings);

  return this.exec(args);
}

export { coldWarm, color, colorTemp, saturation, white };
