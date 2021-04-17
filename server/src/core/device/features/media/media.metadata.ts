import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function getMetadata(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'METADATA');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}
