import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

function setChannel(device: DeviceType, channel: number) {
  try {
    checkAvailableFeature(device, 'CHANNEL');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, channel },
    });
  }
}

function getChannel(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'CHANNEL');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  setChannel,
  getChannel,
};
