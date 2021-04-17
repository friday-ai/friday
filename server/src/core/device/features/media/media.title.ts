import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

function setTitle(device: DeviceType, title: string) {
  try {
    checkAvailableFeature(device, 'TITLE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, title },
    });
  }
}

function getTitle(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'TITLE');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  setTitle,
  getTitle,
};
