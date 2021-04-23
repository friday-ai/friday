import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function rewind(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('REWIND', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'REWIND', id },
    });
  }
}
