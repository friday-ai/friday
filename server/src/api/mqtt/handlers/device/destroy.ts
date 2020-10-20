import Log from '../../../../utils/log';
import MqttServer from '../../index';

const logger = new Log();

export default async function destroy(this: MqttServer, payload: { deviceId: string }) {
  logger.info(`Device destroy ${payload.deviceId}`);
  await this.friday.device.destroy(payload.deviceId);
}
