import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { AvailableState, StateOwner } from '../../../../utils/constants';

async function startRecord(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'RECORD');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_START_RECORD,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'RECORD', id },
    });
  }
}

async function stopRecord(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'RECORD');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_STOP_RECORD,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}

export default {
  startRecord,
  stopRecord,
};
