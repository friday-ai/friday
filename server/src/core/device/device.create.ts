import Device from '../../models/device';
import DeviceType from './device.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(device: DeviceType): Promise<DeviceType> {
  try {
    const createdDevice = await Device.create(device);
    let deviceToReturn = <DeviceType>createdDevice.get({ plain: true });
    return deviceToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
