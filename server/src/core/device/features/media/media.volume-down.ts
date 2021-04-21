import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { StateOwner } from '../../../../utils/constants';

export default async function volumeDown(this: DeviceClass, id: string, volume?: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'VOLUME_DOWN');
    if (typeof volume === 'number') {
      await this.state.set({
        owner: device.id!,
        ownerType: StateOwner.DEVICE,
        value: volume,
      });
    }
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, volume },
    });
  }
}
