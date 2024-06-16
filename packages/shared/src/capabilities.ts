import logger from "@friday-ai/logger";
import type { DeviceCapabilitySettingsSchema } from "./devices";
import { checkProperty } from "./object";
import type { Color } from "./utils";

//     ______                             __      _     __    _    __     _                                 __     _     __
//    / ____/  ____ _    ____   ____ _   / /_    (_)   / /   (_)  / /_   (_)  ___    _____         __  __  / /_   (_)   / /   _____
//   / /      / __ `/   / __ \ / __ `/  / __ \  / /   / /   / /  / __/  / /  / _ \  / ___/        / / / / / __/  / /   / /   / ___/
//  / /___   / /_/ /   / /_/ // /_/ /  / /_/ / / /   / /   / /  / /_   / /  /  __/ (__  )        / /_/ / / /_   / /   / /   (__  )
//  \____/   \__,_/   / .___/ \__,_/  /_.___/ /_/   /_/   /_/   \__/  /_/   \___/ /____/         \__,_/  \__/  /_/   /_/   /____/
//                   /_/

const BRIGHTNESS_MAX_VALUE = 100;
const BRIGHTNESS_MIN_VALUE = 0;
const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;
const ACCEPTED_BOOL_VALUE = [true, false, 1, 0];
const SATURATION_MAX_VALUE = 100;
const SATURATION_MIN_VALUE = 0;

/**
 * Check if the value is in the range of the capability settings
 * @param {number} val - Value to check
 * @param {DeviceCapabilitySettingsSchema | undefined} capabilitySettings - Capability settings
 * @returns {boolean}
 */
export function checkBrightnessRange(val: number, capabilitySettings: DeviceCapabilitySettingsSchema | undefined): boolean {
  const brightnessMax = capabilitySettings?.min || BRIGHTNESS_MAX_VALUE;
  const brightnessMin = capabilitySettings?.min || BRIGHTNESS_MIN_VALUE;
  if (val > brightnessMax || val < brightnessMin) {
    const message = `The number must be in this range ${brightnessMin} to ${brightnessMax}, actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
  return true;
}

/**
 * Ceck if the value is a number
 * @param {unknown} val - Value to check
 * @returns {boolean}
 */
export function checkIfIsANumber(val: unknown): boolean {
  if (Number.isNaN(Number(val))) {
    const message = `The value must be a number, actual format is ${typeof val} : ${val}`;
    logger.error(message);
    throw new Error(message);
  }
  return true;
}

/**
 * Check if the value is a boolean format
 * @param {boolean | number} val - Value to check
 * @returns {boolean}
 */
export function checkBoolValue(val: boolean | number): boolean {
  if (!ACCEPTED_BOOL_VALUE.includes(val)) {
    const message = `The value must be a boolean format (${ACCEPTED_BOOL_VALUE.toString()}), actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
  return true;
}

/**
 * Check if the value has rgb properties
 * @param {Color} rgb - RGB color
 * @returns {boolean}
 */
export function checkRGBProperties(rgb: Color): boolean {
  if (
    !checkProperty(rgb, "red") ||
    rgb.red === null ||
    rgb.red === undefined ||
    !checkProperty(rgb, "blue") ||
    rgb.blue === null ||
    rgb.blue === undefined ||
    !checkProperty(rgb, "green") ||
    rgb.green === null ||
    rgb.green === undefined
  ) {
    const message = "This value can be to a good RGB format. ({red: number[0 to 255], green: number[0 to 255], blue: number[0 to 255])";
    logger.error(message);
    throw new Error(message);
  }

  return true;
}

/**
 * Check if the value is in rgb range
 * @param {String} name - Name of color
 * @param {number} colorType - Color type
 * @returns {boolean}
 */
export function checkRange(name: string, colorType: number): boolean {
  if (colorType > RGB_MAX_VALUE || colorType < RGB_MIN_VALUE) {
    const message = `The color ${name} must be in this range ${RGB_MIN_VALUE} to ${RGB_MAX_VALUE}, actual is ${colorType}`;
    logger.error(message);
    throw new Error(message);
  }
  return true;
}

/**
 * Check if the value is a RGB format (red, green, blue)
 * @param {Color} rgb - RGB color
 * @returns {boolean}
 */
export function checkRGB(rgb: Color): boolean {
  checkRGBProperties(rgb);
  checkRange("red", rgb.red);
  checkRange("blue", rgb.blue);
  checkRange("green", rgb.green);
  return true;
}

/**
 * Check if the value is in saturation range
 * @param {number} val - Value to check
 * @param {DeviceCapabilitySettingsSchema} capabilitySettings - Capability settings
 * @returns {boolean}
 */
export function checkSaturationRange(val: number, capabilitySettings: DeviceCapabilitySettingsSchema): boolean {
  const saturationMax = capabilitySettings?.max || SATURATION_MAX_VALUE;
  const saturationMin = capabilitySettings?.min || SATURATION_MIN_VALUE;
  if (val > saturationMax || val < saturationMin) {
    const message = `The number must be in this range ${saturationMin} to ${saturationMax}, actual is ${val}`;
    logger.error(message);
    throw new Error(message);
  }
  return true;
}
