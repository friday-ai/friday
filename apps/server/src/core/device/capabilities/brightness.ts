import logger from "@friday-ai/logger";
import { type DcstAttributes, type DeviceCapabilitySettingsSchema, DevicesActions } from "@friday-ai/shared";
import type { CapabilityManagerParamsList } from "../../../utils/interfaces";
import type DeviceClass from "../device";

export const options: CapabilityManagerParamsList = {
  setBrightness: {
    actions: [DevicesActions.SET_BRIGHTNESS],
  },
};

const BRIGHTNESS_MAX_VALUE = 100;
const BRIGHTNESS_MIN_VALUE = 0;

function checkBrightnessRange(val: number, capabilitySettings: DeviceCapabilitySettingsSchema | undefined) {
  const brightnessMax = capabilitySettings?.min || BRIGHTNESS_MAX_VALUE;
  const brightnessMin = capabilitySettings?.min || BRIGHTNESS_MIN_VALUE;
  if (val > brightnessMax || val < brightnessMin) {
    const message = `The number must be in this range ${brightnessMin} to ${brightnessMax}, actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

/**
 * Brightness device capability
 * @param args
 */
export async function setBrightness(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  const capabilitySettings = await this.getCapabilityById(args.id);
  checkBrightnessRange(args.value, capabilitySettings.settings.settings);

  return this.exec(args.id, {
    action: DevicesActions.SET_BRIGHTNESS,
    params: { value: args.value },
  });
}
