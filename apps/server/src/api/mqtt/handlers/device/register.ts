import logger from '../../../../utils/log';
import Friday from '../../../../core/friday';
import { DeviceRegisterType } from '../../../../config/device';

/*
 * @route('friday/master/device/register')
 * @param('Object', 'payload', 'DeviceType')
 */
export default async function register(friday: Friday, payload: DeviceRegisterType) {
  logger.info(`Device ${payload.defaultName} registered`);
  await friday.device.register(payload);
}
