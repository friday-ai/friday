import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function fastForward(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('FAST_FORWARD', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'FAST_FORWARD', id },
    });
  }
}
