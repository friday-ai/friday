import DeviceType from '../device.interface';
import getFeatures from '../subdevice/subdevice.getFeatures';
import { KVArr } from '../../../utils/interfaces';

export default function checkAvailableFeature(device: DeviceType, feature: string): KVArr<string> {
  if (device.type && device.subType) {
    const featureList = getFeatures(device.type, device.subType);
    const exist = Object.keys(featureList).some((key) => featureList[key] === feature);
    if (!exist) {
      throw new Error(`This device do not support this feature ${feature}`);
    }
    return featureList;
  }
  throw new Error('This device has no information about his type or subtype');
}
