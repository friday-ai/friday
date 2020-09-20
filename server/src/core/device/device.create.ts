import Device from '../../models/device';
import DeviceType from './device.interface';
import error from '../../utils/errors/coreError';
import {setItemState} from '../../utils/itemState';
import {AvailableState, StateOwner} from '../../utils/constants';

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
    const deviceToReturn = <DeviceType>createdDevice.get({ plain: true });
    setItemState(
        deviceToReturn.id!,
        deviceToReturn.id!,
        StateOwner.DEVICE,
        AvailableState.DEVICE_WAITING_CONFIGURATION
    );
    return deviceToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: device,
    });
  }
}
