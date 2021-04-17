import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function volumeUp(device: DeviceType, volume?: number) {
  try {
    checkAvailableFeature(device, 'VOLUME_UP');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, volume },
    });
  }
}
