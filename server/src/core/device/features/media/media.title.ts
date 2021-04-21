import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function getTitle(this: DeviceClass, id: string, title: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'TITLE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, title },
    });
  }
}
