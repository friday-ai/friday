import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

function setState(device: DeviceType, value: number) {
  try {
    checkAvailableFeature(device, 'STATE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, value },
    });
  }
}

function getState(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'STATE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  setState,
  getState,
};
