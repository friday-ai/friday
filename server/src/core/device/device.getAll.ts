import Device from '../../models/device';
import DeviceType from './device.interface';
import error from '../../utils/errors/coreError';
import { GetOptions } from '../../utils/interfaces';

const DEFAULT_OPTIONS: GetOptions = {
  scope: '',
  take: 20,
  skip: 0,
};

/**
 * Get all devices.
 * @param {GetOptions} options - Options of the query.
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
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let devices;

    if (mergedOptions.scope !== '' && mergedOptions.scope !== null && mergedOptions.scope !== undefined) {
      devices = await Device.scope(mergedOptions.scope).findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    } else {
      devices = await Device.findAll({
        limit: mergedOptions.take,
        offset: mergedOptions.skip,
      });
    }

    const devicesPlain = <DeviceType[]>devices.map((device) => {
      const devicePlain = device.get({ plain: true });
      return devicePlain;
    });

    return devicesPlain;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: options,
    });
  }
}
