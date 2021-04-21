import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function fastForward(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'FAST_FORWARD');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}
