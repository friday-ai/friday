import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { AvailableState, StateOwner } from '../../../../utils/constants';

async function setState(this: DeviceClass, id: string, state: AvailableState) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'STATE');
    this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: state,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { deviceClass: this, id, state },
    });
  }
}

async function getState(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'STATE');
    const state = await this.state.getByOwner(device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { deviceClass: this, id },
    });
  }
}

export default {
  setState,
  getState,
};
