import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function getMetadata(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'METADATA');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'METADATA', id },
    });
  }
}
