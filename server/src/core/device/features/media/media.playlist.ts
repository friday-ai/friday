import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import { KVArr } from '../../../../utils/interfaces';
import DeviceClass from '../../index';

async function setPlaylist(this: DeviceClass, id: string, playlist: KVArr<string>) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'PLAYLIST');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, playlist },
    });
  }
}

async function getPlaylist(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'PLAYLIST');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}

export default {
  setPlaylist,
  getPlaylist,
};
