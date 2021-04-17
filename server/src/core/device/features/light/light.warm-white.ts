import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function warmWhite(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'WARM_WHITE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}
