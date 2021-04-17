import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

function startRecord(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'RECORD');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

function stopRecord(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'RECORD');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  startRecord,
  stopRecord,
};
