import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

function setBattery(device: DeviceType, value: number) {
  try {
    checkAvailableFeature(device, 'BATTERY');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, value },
    });
  }
}

function getBattery(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'BATTERY');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  setBattery,
  getBattery,
};
