import logger from '../../../../utils/log';
import { DeviceType } from '../../../../config/entities';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/device/set')
 * @param('Object', 'payload', '{deviceName: string, device: DeviceType}')
 */
export default async function set(friday: Friday, payload: { deviceName: string, device: DeviceType }) {
  logger.info(`Device set ${payload.deviceName}`);
  await friday.device.create(payload.device);
}
