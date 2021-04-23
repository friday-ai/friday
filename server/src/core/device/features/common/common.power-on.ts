import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import { AvailableState, StateOwner } from '../../../../utils/constants';
import DeviceClass from '../../index';

export default async function powerOn(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'POWER_ON');

    this.state.set({
      owner: device.id!,
      ownerType: StateOwner.DEVICE,
      value: AvailableState.DEVICE_POWER_ON,
    });
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'POWER_ON', id },
    });
  }
}
