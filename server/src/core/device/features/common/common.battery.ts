import DeviceClass from '../../index';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import { StateOwner } from '../../../../utils/constants';

async function setBattery(this: DeviceClass, id: string, battery: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BATTERY');
    this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: battery,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'BATTERY', id, battery },
    });
  }
}

async function getBattery(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BATTERY');
    const state = await this.state.getByOwner(device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'BATTERY', id },
    });
  }
}

export {
  setBattery,
  getBattery,
};
