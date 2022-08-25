import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { DevicesActionsType } from '../../../config/device';
import { CapabilityManagerParamsList, Color } from '../../../utils/interfaces';

export const options: CapabilityManagerParamsList = {
  color: {
    actions: [DevicesActionsType.COLOR],
  },
  coldWarm: {
    actions: [DevicesActionsType.COLD, DevicesActionsType.WARM],
  },
  colorTemp: {
    actions: [DevicesActionsType.COLOR_TEMP],
  },
  white: {
    actions: [DevicesActionsType.WHITE],
  },
};

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

function checkRange(name: string, colorType: number) {
  if (colorType > RGB_MAX_VALUE || colorType < RGB_MIN_VALUE) {
    throw new Error(`The color ${name} must be in this range 0 to 255, actual is ${colorType}`);
  }
}

function checkRGB(rgb: Color) {
  checkRange('red', rgb.red);
  checkRange('blue', rgb.blue);
  checkRange('green', rgb.green);
}

/**
 * color device capability
 * @param args
 */
async function color(this: DeviceClass, args: { id: string, value: Color }): Promise<DeviceCapabilityStateType> {
  const rgb: Color = args.value;
  checkRGB(rgb);

  return this.exec(
    args.id, {
      action: DevicesActionsType.COLOR, params: { value: `${rgb.red}, ${rgb.green}, ${rgb.blue}` },
    },
  );
}

/**
 * coldWarm device capability
 * @param args
 *
 * if args.value = 1 then cold method else warm method
 */
async function coldWarm(this: DeviceClass, args: { id: string, value: boolean }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: args.value ? DevicesActionsType.COLD : DevicesActionsType.WARM, params: { value: args.value },
    },
  );
}

/**
 * colorTemp device capability
 * @param args
 *
 */
async function colorTemp(this: DeviceClass, args: { id: string, value: number }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: DevicesActionsType.COLOR_TEMP, params: { value: args.value },
    },
  );
}

/**
 * white device capability
 * @param args
 *
 */
async function white(this: DeviceClass, args: { id: string, value: boolean | null }): Promise<DeviceCapabilityStateType> {

  return this.exec(
    args.id, {
      action: DevicesActionsType.WHITE, params: { value: '255, 255, 255' },
    },
  );
}

export {
  color,
  coldWarm,
  colorTemp,
  white,
};
