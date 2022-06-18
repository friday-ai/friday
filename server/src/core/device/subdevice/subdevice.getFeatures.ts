import { DEVICE_TYPE_COMMON_FEATURE, DEVICE_SUBTYPE_FEATURE_LIST, DEVICE_SUBTYPE_LIST } from '../../../config/device';
import error from '../../../utils/decorators/error';
import { KVArr } from '../../../utils/interfaces';

/**
 * Get features list by device and subdevice
 *
 * @param type
 * @param subtype
 *
 * @return KVArr<string>
 */
export default function getAvailableFeatures(type: string, subtype: string): KVArr<string> {
  try {
    if (!type && !subtype) {
      throw new Error('This device has no information about his type or subtype');
    }

    if (!(type in DEVICE_SUBTYPE_LIST)) {
      throw new Error(`${type} is not part of the available devices`);
    }

    if (!(subtype in DEVICE_SUBTYPE_LIST[type])) {
      throw new Error(`${subtype} is not part of the subdevices available in the device ${type}`);
    }

    const deviceFeature = DEVICE_TYPE_COMMON_FEATURE[type];
    const subdeviceFeature = DEVICE_SUBTYPE_FEATURE_LIST[type][subtype];
    return { ...deviceFeature, ...subdeviceFeature };
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { type, subtype },
    });
  }
}
