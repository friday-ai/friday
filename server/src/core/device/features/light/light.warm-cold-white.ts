import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { StateOwner } from '../../../../utils/constants';

async function setWarmColdWhite(this: DeviceClass, id: string, warmColdWite: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'WARM_COLD_WHITE');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: warmColdWite,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, warmColdWite },
    });
  }
}

async function getWarmColdWhite(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'WARM_COLD_WHITE');
    const state = await this.state.getByOwner(device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}

export default {
  setWarmColdWhite,
  getWarmColdWhite,
};
