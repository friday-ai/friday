import Device from '../../models/device';
import DeviceType from './device.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function getById(id: string, scope?: string): Promise<DeviceType> {
  try {

    let device;

    if (scope !== '' && scope !== null && scope !== undefined) {
      device = await Device.scope(scope).findByPk(id);
    } else {
      device = await Device.findByPk(id);
    }

    if (device === null) {
      throw logger.error('Device not found');
    }

    let deviceToReturn = <DeviceType>device.get({ plain: true });

    return deviceToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
