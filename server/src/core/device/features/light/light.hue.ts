/* eslint-disable no-bitwise */
import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';
import { Color, FeatureParameter } from '../../../../utils/interfaces';

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

async function setHue(params: FeatureParameter) {
  try {
    if (!('rgb' in params)) {
      throw new Error('RGB is missing from parameters');
    }

    if (!('red' in params.rgb!) && !('green' in params.rgb!) && !('blue' in params.rgb!)) {
      throw new Error('red, green and blue is missing from RGB parameters');
    }

    const state = await params.deviceClass.state.set({
      owner: params.deviceType.id!,
      ownerType: StateOwner.DEVICE,
      value: rgbToInt(params.rgb!.red, params.rgb!.green, params.rgb!.blue),
    });

    if (typeof state.value !== 'number') {
      throw new Error(`This value ${state.value} is not a number !`);
    }
    state.value = intToRgb(state.value);
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
    if (typeof state.value === 'string') {
      const intRGB = parseInt(state.value, 10);
      if (Number.isNaN(intRGB)) {
        throw new Error(`This value ${state.value} is not a number !`);
      }
      state.value = intToRgb(intRGB);
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
