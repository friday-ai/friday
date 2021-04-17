import DeviceType from '../device.interface';
import getFeatures from '../subdevice/subdevice.getFeatures';

export default function checkAvailableFeature(device: DeviceType, feature: string): void {
  if (device.type && device.subType) {
    if (!(feature in getFeatures(device.type, device.subType))) {
      throw new Error(`This device do not support this feature ${feature}`);
    }
  } else {
    throw new Error('This device has no information about his type or subtype');
  }
}
