import logger from './log';
import { Color } from './interfaces';

const ACCEPTED_BOOL_VALUE = [
  true,
  false,
  1,
  0,
];

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

const BRIGHTNESS_MAX_VALUE = 100;
const BRIGHTNESS_MIN_VALUE = 0;

function logAndThrow(message: string) {
  logger.error(message);
  throw new Error(message);
}

function checkRGBProperties(rgb: Color) {
  if (
    !rgb.hasOwnProperty('red') || rgb.red === null || rgb.red === undefined
    || !rgb.hasOwnProperty('blue') || rgb.blue === null || rgb.blue === undefined
    || !rgb.hasOwnProperty('green') || rgb.green === null || rgb.green === undefined
  ) {
    logAndThrow('This value can be to a good RGB format. ({red: number[0 to 255], green: number[0 to 255], blue: number[0 to 255])');
  }
}

function checkRange(name: string, colorType: number) {
  if (colorType > RGB_MAX_VALUE || colorType < RGB_MIN_VALUE) {
    logAndThrow(`The color ${name} must be in this range ${RGB_MIN_VALUE} to ${RGB_MAX_VALUE}, actual is ${colorType}`);
  }
}

function checkBoolValue(val: any) {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    logAndThrow(`The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`);
  }
}

function checkRGB(rgb: Color) {
  checkRGBProperties(rgb);
  checkRange('red', rgb.red);
  checkRange('blue', rgb.blue);
  checkRange('green', rgb.green);
}

function checkBrightnessRange(val: number) {
  if (val > BRIGHTNESS_MAX_VALUE || val < BRIGHTNESS_MIN_VALUE) {
    logAndThrow(`The number must be in this range ${BRIGHTNESS_MIN_VALUE} to ${BRIGHTNESS_MAX_VALUE}, actual is ${val}`);
  }
}


export {
  checkBoolValue,
  checkRGB,
  checkBrightnessRange,
};
