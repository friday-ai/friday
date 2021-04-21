import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { StateOwner } from '../../../../utils/constants';

async function setBrightness(this: DeviceClass, id: string, bright: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BRIGHTNESS');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: bright,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, bright },
    });
  }
}

async function getBrightness(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BRIGHTNESS');
    const state = await this.state.getByOwner(device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}

export default {
  setBrightness,
  getBrightness,
};
