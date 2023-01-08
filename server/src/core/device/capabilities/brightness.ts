import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import { DeviceCapabilitySettingsSchema, DevicesActionsType } from '../../../config/device';
import logger from '../../../utils/log';

export const options: CapabilityManagerParamsList = {
  setBrightness: {
    actions: [DevicesActionsType.SET_BRIGHTNESS],
  },
};

const BRIGHTNESS_MAX_VALUE = 100;
const BRIGHTNESS_MIN_VALUE = 0;

function checkBrightnessRange(val: number, capabilitySettings: DeviceCapabilitySettingsSchema | undefined) {
  const brightnessMax = capabilitySettings?.settings?.max || BRIGHTNESS_MAX_VALUE;
  const brightnessMin = capabilitySettings?.settings?.min || BRIGHTNESS_MIN_VALUE;
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
export async function setBrightness(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {
  const capabilitySettings = await this.getCapabilityById(args.id);
  checkBrightnessRange(args.value, capabilitySettings.settings);

  return this.exec(
    args.id, {
      action: DevicesActionsType.SET_BRIGHTNESS, params: { value: args.value },
    },
  );
}
