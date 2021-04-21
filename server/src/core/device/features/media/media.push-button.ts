import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function pushButton(this: DeviceClass, id: string, button: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'PUSH_BUTTON');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, button },
    });
  }
}
