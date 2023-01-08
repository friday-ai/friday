import logger from '../../../../utils/log';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/device/destroy')
 * @param('Object', 'payload', '{deviceId: string}')
 */
export default async function destroy(friday: Friday, payload: { deviceId: string }) {
  logger.info(`Device destroy ${payload.deviceId}`);
  await friday.device.destroy(payload.deviceId);
}
