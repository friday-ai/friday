import { DEVICE_TYPE_COMMON_FEATURE, DEVICE_SUBTYPE_FEATURE_LIST, DEVICE_SUBTYPE_LIST } from '../../../utils/device.constants';
import error from '../../../utils/errors/coreError';

/**
 * Récupère la liste des features par rapport a un device et a un subdevice donnée
 *
 * @param device
 * @param subdevice
 *
 * @return {[key: string]: string}
 */
const getFeatures = (device: string, subdevice: string): { [key: string]: string; } => {
  try {
    if (!(device in DEVICE_SUBTYPE_LIST)) {
      throw new Error(`${device} ne fais pas partie des devices présent`);
    }

    if (!(subdevice in DEVICE_SUBTYPE_LIST[device])) {
      throw new Error(`${subdevice} ne fais pas partie des subdevices présent dans le device ${device}`);
    }

    const deviceFeature = DEVICE_TYPE_COMMON_FEATURE[device];
    const subdeviceFeature = DEVICE_SUBTYPE_FEATURE_LIST[device][subdevice];
    return { ...deviceFeature, ...subdeviceFeature };
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, subdevice },
    });
  }
};

export default {
  getFeatures,
};
