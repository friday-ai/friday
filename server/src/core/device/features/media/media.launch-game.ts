import DeviceType from '../../device.interface';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

export default function launchGame(device: DeviceType, game: string) {
  try {
    checkAvailableFeature(device, 'LAUNCH_GAME');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { device, game },
    });
  }
}
