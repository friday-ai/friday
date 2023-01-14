import { DevicesActions, DcstAttributes, DeviceCapabilitySettingsSchema, Color } from '@friday/shared';
import DeviceClass from '../device';
import { CapabilityManagerParamsList } from '../../../utils/interfaces';
import logger from '../../../utils/log';
import { checkProperty } from '../../../utils/object';

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

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;
const ACCEPTED_BOOL_VALUE = [true, false, 1, 0];
const SATURATION_MAX_VALUE = 100;
const SATURATION_MIN_VALUE = 0;

function checkRGBProperties(rgb: Color) {
  if (
    !checkProperty(rgb, 'red') ||
    rgb.red === null ||
    rgb.red === undefined ||
    !checkProperty(rgb, 'blue') ||
    rgb.blue === null ||
    rgb.blue === undefined ||
    !checkProperty(rgb, 'green') ||
    rgb.green === null ||
    rgb.green === undefined
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

function checkBoolValue(val: boolean | number) {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    const message = `The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

function checkSaturationRange(val: number, capabilitySettings: DeviceCapabilitySettingsSchema) {
  const saturationMax = capabilitySettings?.max || SATURATION_MAX_VALUE;
  const saturationMin = capabilitySettings?.min || SATURATION_MIN_VALUE;
  if (val > saturationMax || val < saturationMin) {
    const message = `The number must be in this range ${saturationMin} to ${saturationMax}, actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
}

/**
 * color device capability
 * @param args
 */
async function color(this: DeviceClass, args: { id: string; value: Color }): Promise<DcstAttributes> {
  const rgb: Color = args.value;
  checkRGB(rgb);

  return this.exec(args.id, {
    action: DevicesActions.COLOR,
    params: { value: `${rgb.red}, ${rgb.green}, ${rgb.blue}` },
  });
}

/**
 * coldWarm device capability
 * @param args
 *
 * if args.value = 1 then cold method else warm method
 */
async function coldWarm(this: DeviceClass, args: { id: string; value: boolean }): Promise<DcstAttributes> {
  checkBoolValue(args.value);

  return this.exec(args.id, {
    action: args.value ? DevicesActions.COLD : DevicesActions.WARM,
    params: { value: args.value },
  });
}

/**
 * colorTemp device capability
 * @param args
 *
 */
async function colorTemp(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  return this.exec(args.id, {
    action: DevicesActions.COLOR_TEMP,
    params: { value: args.value },
  });
}

/**
 * white device capability
 * @param args
 *
 */
async function white(this: DeviceClass, args: { id: string; value: boolean | null }): Promise<DcstAttributes> {
  return this.exec(args.id, {
    action: DevicesActions.WHITE,
    params: { value: '255, 255, 255' },
  });
}

async function saturation(this: DeviceClass, args: { id: string; value: number }): Promise<DcstAttributes> {
  const capability = await this.getCapabilityById(args.id);
  checkSaturationRange(args.value, capability.settings.settings);
  return this.exec(args.id, {
    action: DevicesActions.SATURATION,
    params: { value: args.value },
  });
}

export { color, coldWarm, colorTemp, white, saturation };
