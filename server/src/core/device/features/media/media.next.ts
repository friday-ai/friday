import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function next(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'NEXT');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}
