import DeviceClass from '../device';
import { DeviceCapabilityStateType } from '../../../config/entities';
import { DevicesActionsType } from '../../../config/device';
import { CapabilityManagerParamsList, Color } from '../../../utils/interfaces';
import logger from '../../../utils/log';

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
const ACCEPTED_BOOL_VALUE = [
  true,
  false,
  1,
  0,
];

function checkRGBProperties(rgb: Color) {
  if (
    !rgb.hasOwnProperty('red') || rgb.red === null || rgb.red === undefined
    || !rgb.hasOwnProperty('blue') || rgb.blue === null || rgb.blue === undefined
    || !rgb.hasOwnProperty('green') || rgb.green === null || rgb.green === undefined
  ) {
    const message = 'This value can be to a good RGB format. ({red: number[0 to 255], green: number[0 to 255], blue: number[0 to 255])';
    logger.error(message);
    throw new Error(message);
  }
}

function checkRange(name: string, colorType: number) {
  if (colorType > RGB_MAX_VALUE || colorType < RGB_MIN_VALUE) {
    const message = `The color ${name} must be in this range ${RGB_MIN_VALUE} to ${RGB_MAX_VALUE}, actual is ${colorType}`;
    logger.error(message);
    throw new Error(message);
  }
}

function checkRGB(rgb: Color) {
  checkRGBProperties(rgb);
  checkRange('red', rgb.red);
  checkRange('blue', rgb.blue);
  checkRange('green', rgb.green);
}

function checkBoolValue(val: any) {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    const message = `The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
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
  checkBoolValue(args.value);

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
