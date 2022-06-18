import { DeviceType } from '../../../config/entities';
import getAvailableFeatures from '../subdevice/subdevice.getFeatures';

export default function checkAvailableFeature(device: DeviceType, feature: string) {
  if (!device.type && !device.subType) {
    throw new Error('This device has no information about his type or subtype');
  } else {
    const featureList = getAvailableFeatures(device.type!, device.subType!);
    const exist = Object.keys(featureList).some((key) => featureList[key] === feature);
    if (!exist) {
      throw new Error(`This device do not support this feature ${feature}`);
    }
  }
}
