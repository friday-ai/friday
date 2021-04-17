import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function hue(device: DeviceType, red: number, green: number, blue: number) {
  try {
    checkAvailableFeature(device, 'HUE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, rgb: { red, green, blue } },
    });
  }
}
