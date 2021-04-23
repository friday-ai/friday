import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { StateOwner } from '../../../../utils/constants';

async function setChannel(this: DeviceClass, id: string, channel: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'CHANNEL');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: channel,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'CHANNEL', id, channel },
    });
  }
}

async function getChannel(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'CHANNEL');
    const state = await this.state.getByOwner(device.id!);
    return state.value;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'CHANNEL', id },
    });
  }
}

export {
  setChannel,
  getChannel,
};
