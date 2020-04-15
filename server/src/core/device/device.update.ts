import Device from '../../models/device';
import DeviceType from './device.interface';
import error, { NotFoundError } from '../../utils/errors/coreError';

/**
 * Update a device.
 * @param {String} id - Id of device.
 * @param {DeviceType} device - A device object.
 * @returns {Promise<DeviceType>} Resolve with updated device.
 * @example
 * ````
 * friday.device.update(
 * '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
 * {
 *   id: '36440e00-bef2-4cdb-883e-1bada5bc501b'
 *   name: 'device update'
 * });
 * ````
 */
export default async function update(id: string, device: DeviceType): Promise<DeviceType> {
  try {
    const deviceToUpdate = await Device.findByPk(id);

    if (deviceToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Device', message: 'Device not found', metadata: device.id });
    }
    deviceToUpdate.update(device);
    const deviceToReturn = <DeviceType>deviceToUpdate.get({ plain: true });
    return deviceToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: device,
    });
  }
}
