import Log from '../../../../utils/log';
import MqttServer from '../../index';
import DeviceType from '../../../../core/device/device.interface';

/*
 * @route('friday/master/device/set')
 * @param('Object', 'payload', '{deviceName: string, device: DeviceType}')
 */
export default async function set(this: MqttServer, payload: { deviceName: string, device: DeviceType }) {
  const logger = new Log();
  logger.info(`Device set ${payload.deviceName}`);
  await this.friday.device.create(payload.device);
}
