import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function launchGame(this: DeviceClass, id: string, game: string) {
  try {
    await this.sendCommand('LAUNCH_GAME', id, [game]);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'LAUNCH_GAME', id, game },
    });
  }
}
