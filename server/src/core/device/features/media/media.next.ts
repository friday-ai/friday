import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function next(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('NEXT', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'NEXT', id },
    });
  }
}
