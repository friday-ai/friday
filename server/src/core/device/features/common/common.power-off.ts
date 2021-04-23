import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../../../utils/constants';
import DeviceClass from '../../index';

export default async function powerOff(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'POWER_OFF');

    this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_POWER_OFF,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'POWER_OFF', id },
    });
  }
}
