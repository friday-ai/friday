import { DEVICE_TYPE_COMMON_FEATURE, DEVICE_SUBTYPE_FEATURE_LIST, DEVICE_SUBTYPE_LIST } from '../../../utils/device.constants';
import error from '../../../utils/errors/coreError';
import { KVArr } from '../../../utils/interfaces';

/**
 * Get features list by device and subdevice
 *
 * @param device
 * @param subdevice
 *
 * @return KVArr<string>
 */
export default function getFeatures(device: string, subdevice: string): KVArr<string> {
  try {
    if (!(device in DEVICE_SUBTYPE_LIST)) {
      throw new Error(`${device} is not part of the available devices`);
    }

    if (!(subdevice in DEVICE_SUBTYPE_LIST[device])) {
      throw new Error(`${subdevice} is not part of the subdevices available in the device ${device}`);
    }

    const deviceFeature = DEVICE_TYPE_COMMON_FEATURE[device];
    const subdeviceFeature = DEVICE_SUBTYPE_FEATURE_LIST[device][subdevice];
    return { ...deviceFeature, ...subdeviceFeature };
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, subdevice },
    });
  }
}
