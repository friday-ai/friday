/* eslint-disable no-bitwise */
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { StateOwner } from '../../../../utils/constants';

function rgbToInt(red: number, green: number, blue: number): number {
  let rgb = red;
  rgb = (rgb << 8) + green;
  return (rgb << 8) + blue;
}

function intToRgb(int: number): number[] {
  const red = (int & 0xff0000) >> 16;
  const green = (int & 0x00ff00) >> 8;
  const blue = (int & 0x0000ff);

  return [red, green, blue];
}

async function setHue(this: DeviceClass, id: string, red: number, green: number, blue: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'HUE');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: rgbToInt(red, green, blue),
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'HUE', id, rgb: { red, green, blue } },
    });
  }
}

async function getHue(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'HUE');
    const state = await this.state.getByOwner(device.id!);
    if (typeof state.value === 'string') {
      throw new Error(`This value ${state.value} is not a number !`);
    }
    return intToRgb(state.value);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'HUE', id },
    });
  }
}

export {
  setHue,
  getHue,
};
