import Device from '../../models/device';
import DeviceType from './device.interface';
import Log from '../../utils/log';
import { GetOptions } from '../../utils/constants';

const logger = new Log();
const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0
};

/**
 * Get all devices.
 * @param {Getoptions} options - Options of the query.
 * @returns {Promise<DeviceType[]>} Resolve with device array.
 * @example
 * ````
 * friday.device.getAll({
 *    scope: '',
 *    take: 20,
 *    skip: 0
 *  });
 * ````
 */
export default async function getAll(options?: GetOptions): Promise<DeviceType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let devices;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      devices = await Device.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      devices = await Device.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const devicesPlain = <DeviceType[]>devices.map((device) => {
      const devicePlain = device.get({ plain: true });
      return devicePlain;
    });

    return devicesPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
