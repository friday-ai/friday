import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function warmColdWhite(device: DeviceType, value: number) {
  try {
    checkAvailableFeature(device, 'WARM_COLD_WHITE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, value },
    });
  }
}
