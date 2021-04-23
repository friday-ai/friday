import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function white(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('WHITE', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WHITE', id },
    });
  }
}
