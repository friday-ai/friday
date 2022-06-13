import logger from '../../../../utils/log';
import MqttServer from '../../index';

/*
 * @route('friday/master/device/destroy')
 * @param('Object', 'payload', '{deviceId: string}')
 */
export default async function destroy(this: MqttServer, payload: { deviceId: string }) {
  logger.info(`Device destroy ${payload.deviceId}`);
  await this.friday.device.destroy(payload.deviceId);
}
