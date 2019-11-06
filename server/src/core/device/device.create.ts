import Device from '../../models/device';
import DeviceType from './device.interface';
import error from '../../utils/errors/coreError';

/**
 * Create a device.
 * @param {DeviceType} device - A device object.
 * @returns {Promise<DeviceType>} Resolve with created device.
 * @example
 * ````
 * friday.device.create({
 *    id: '8ae2dc77-a733-45b9-bbe6-69d837222dce',
 *    name: 'Light sample',
 *    type: AvailableTypeOfDevice.LIGHT,
 *    subType: AvailableSubTypeOfDevice.LIGHT_RGB,
 *    variable: '',
 *    unit: '',
 *    value: 'on',
 *    roomId: '84901b92-06fe-4f0f-93bd-d4ead2105720',
 *    pluginId: ''
 * });
 * ````
 */
export default async function create(device: DeviceType): Promise<DeviceType> {
  try {
    const createdDevice = await Device.create(device);
    let deviceToReturn = <DeviceType>createdDevice.get({ plain: true });
    return deviceToReturn;
  } catch (e) {
    throw error({name: e.name, message: e.message, cause: e, metadata: device});
  }
}
