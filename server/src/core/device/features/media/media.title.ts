import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function getTitle(this: DeviceClass, id: string, title: string) {
  try {
    await this.sendCommand('TITLE', id, [title]);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'TITLE', id, title },
    });
  }
}
