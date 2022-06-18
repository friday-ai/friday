/* eslint-disable no-bitwise */
import error from '../../../../utils/decorators/error';
import { StateOwner } from '../../../../config/constants';
import { Color, FeatureParameter } from '../../../../utils/interfaces';

const RGB_MAX_VALUE = 255;
const RGB_MIN_VALUE = 0;

function rgbToInt(red: number, green: number, blue: number): number {
  let rgb = red;
  rgb = (rgb << 8) + green;
  return (rgb << 8) + blue;
}

function intToRgb(int: number): Color {
  const red = (int & 0xff0000) >> 16;
  const green = (int & 0x00ff00) >> 8;
  const blue = (int & 0x0000ff);

  return { red, green, blue };
}

function checkRange(name: string, color: number) {
  if (color > RGB_MAX_VALUE || color < RGB_MIN_VALUE) {
    throw new Error(`The color ${name} must be in this range 0 to 255, actual is ${color}`);
  }
}

async function setHue(params: FeatureParameter) {
  try {
    if (!('rgb' in params)) {
      throw new Error('RGB is missing from parameters');
    }

    checkRange('red', params.rgb!.red);
    checkRange('blue', params.rgb!.blue);
    checkRange('green', params.rgb!.green);

    const state = await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: rgbToInt(params.rgb!.red, params.rgb!.green, params.rgb!.blue),
    });

    if (typeof state.value === 'number') {
      state.value = intToRgb(state.value);
    }

    return state;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'HUE', params },
    });
  }
}

async function getHue(params: FeatureParameter) {
  try {
    const state = await params.deviceClass.state.getByOwner(params.deviceType.id!);

    if (typeof state.value === 'number') {
      state.value = intToRgb(state.value);
    } else if (typeof state.value !== 'object') {
      state.value = intToRgb(parseInt(state.value, 10));
    }

    return state;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'HUE', params },
    });
  }
}

export {
  setHue,
  getHue,
};
