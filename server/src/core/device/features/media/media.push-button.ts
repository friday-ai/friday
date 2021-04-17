import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function pushButton(device: DeviceType, button: string) {
  try {
    checkAvailableFeature(device, 'PUSH_BUTTON');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, button },
    });
  }
}
