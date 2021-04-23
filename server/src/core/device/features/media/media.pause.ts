import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function pause(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('PAUSE', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PAUSE', id },
    });
  }
}
