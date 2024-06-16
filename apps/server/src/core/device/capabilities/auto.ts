import { DevicesActions, DevicesCapabilities, type DeviceCommand } from "@friday-ai/shared";
import { BadParametersError } from "../../../utils/decorators/error";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  auto: {
    actions: [DevicesActions.AUTO],
  },
};

/**
 * Brightness device capability
 * @param args
 */
export async function auto(this: DeviceClass, args: DeviceCommand): Promise<void> {
  // Type guard only, if capability wasn't found
  // the process will be stopped before
  if (args.capability === undefined) {
    throw new BadParametersError({ name: "Friday set capability", message: "Capability not found", metadata: args.params.capabilityId });
  }

  // Ulgy to use this method
  switch (args.capability.type) {
    case DevicesCapabilities.ONOFF:
      if (args.params.value === true || args.params.value === "true" || args.params.value === 1) {
        this.event.emit(DevicesActions.TURN_ON, args);
      } else {
        this.event.emit(DevicesActions.TURN_OFF, args);
      }
      break;
    case DevicesCapabilities.BRIGHTNESS:
      this.event.emit(DevicesActions.SET_BRIGHTNESS, args);
      break;
    case DevicesCapabilities.COLOR:
      this.event.emit(DevicesActions.COLOR, args);
      break;
    case DevicesCapabilities.COLORTEMP:
      this.event.emit(DevicesActions.COLOR_TEMP, args);
      break;
    case DevicesCapabilities.WHITE:
      this.event.emit(DevicesActions.WHITE, args);
      break;
    case DevicesCapabilities.SATURATION:
      this.event.emit(DevicesActions.SATURATION, args);
      break;
    case DevicesCapabilities.COLDWARM:
      this.event.emit(DevicesActions.COLD, args);
      break;
    case DevicesCapabilities.TEMPERATURE:
      this.event.emit(DevicesActions.SET_TEMPERATURE, args);
      break;
    case DevicesCapabilities.HUMIDITY:
      this.event.emit(DevicesActions.SET_HUMIDITY, args);
      break;
    case DevicesCapabilities.INTENSITY:
      this.event.emit(DevicesActions.SET_INTENSITY_CONSUMPTION, args);
      break;
    case DevicesCapabilities.POWER:
      this.event.emit(DevicesActions.SET_POWER_CONSUMPTION, args);
      break;
    case DevicesCapabilities.WATER:
      this.event.emit(DevicesActions.SET_WATER_CONSUMPTION, args);
      break;
    case DevicesCapabilities.MOTION:
      this.event.emit(DevicesActions.SET_MOTION, args);
      break;
    case DevicesCapabilities.OPENCLOSE:
      if (args.params.value === true || args.params.value === "true" || args.params.value === 1) {
        this.event.emit(DevicesActions.OPEN, args);
      } else {
        this.event.emit(DevicesActions.CLOSE, args);
      }
      break;
    case DevicesCapabilities.LUMINOSITY:
      this.event.emit(DevicesActions.SET_LUMINOSITY, args);
      break;
    default:
      break;
  }
}
