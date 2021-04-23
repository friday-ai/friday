import error from '../../../../utils/errors/coreError';
import DeviceClass from '../../index';

export default async function pushButton(this: DeviceClass, id: string, button: string) {
  try {
    await this.sendCommand('PUSH_BUTTON', id, [button]);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { feature: 'PUSH_BUTTON', id, button },
    });
  }
}
