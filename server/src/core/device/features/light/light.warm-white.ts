import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function warmWhite(this: DeviceClass, id: string) {
  try {
    await this.sendCommand('WARM_WHITE', id);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'WARM_WHITE', id },
    });
  }
}
