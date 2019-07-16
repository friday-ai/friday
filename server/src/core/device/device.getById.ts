import Device from '../../models/device';
import DeviceType from './device.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * @name device.getById
 * @description Get a device by id.
 * @param {String} id - Id of device.
 * @param {String} scope - Scope option. (Optional)
 * @returns {Promise<DeviceType>} Resolve with device.
 * @example
 * friday.device.getById('40085fb8-1784-49be-84ad-8adbca1ebc3d', 'full');
 */
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
