import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';
import { AvailableState, StateOwner } from '../../../../utils/constants';

export default async function play(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'PLAY');
    await this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_MEDIA_PLAY,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PLAY', id },
    });
  }
}
