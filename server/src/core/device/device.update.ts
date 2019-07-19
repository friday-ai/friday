import Device from '../../models/device';
import DeviceType from './device.interface';
import Log from '../../utils/log';
const logger = new Log();

/**
 * Update a device.
 * @param {DeviceType} device - A device object.
 * @returns {Promise<DeviceType>} Resolve with updated device.
 * @example
 * ````
 * friday.device.update({
 *   id: '36440e00-bef2-4cdb-883e-1bada5bc501b'
 *   name: 'device update'
 * });
 * ````
 */
export default async function update(device: DeviceType): Promise<DeviceType> {
  try {

    const deviceToUpdate = await Device.findByPk(device.id);

    if (deviceToUpdate === null) {
      throw logger.error('Device not found');
    }
    deviceToUpdate.update(device);
    let deviceToReturn = <DeviceType>deviceToUpdate.get({ plain: true });
    return deviceToReturn;

  } catch (e) {
    throw logger.error(e);
  }
}
