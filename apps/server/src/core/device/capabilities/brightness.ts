import { DeviceCapabilitySettingsSchema, DevicesActions, DcstAttributes } from '@friday/shared';
import logger from '@friday/logger';
import DeviceClass from '../device';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';

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
