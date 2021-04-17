import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function powerOff(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'POWER_OFF');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}
