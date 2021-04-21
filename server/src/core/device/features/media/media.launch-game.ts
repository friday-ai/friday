import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function launchGame(this: DeviceClass, id: string, game: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'LAUNCH_GAME');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, game },
    });
  }
}
