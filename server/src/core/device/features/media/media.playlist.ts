import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import { KVArr } from '../../../../utils/interfaces';

function setPlaylist(device: DeviceType, playlist: KVArr<string>) {
  try {
    checkAvailableFeature(device, 'PLAYLIST');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, playlist },
    });
  }
}

function getPlaylist(device: DeviceType) {
  try {
    checkAvailableFeature(device, 'PLAYLIST');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device },
    });
  }
}

export default {
  setPlaylist,
  getPlaylist,
};
