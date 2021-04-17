import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function volumeDown(device: DeviceType, volume?: number) {
  try {
    checkAvailableFeature(device, 'VOLUME_DOWN');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, volume },
    });
  }
}
