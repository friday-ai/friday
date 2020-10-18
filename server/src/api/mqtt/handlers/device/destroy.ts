import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function destroy(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Device destroy ${json.deviceId}`);
  this.friday.device.destroy(json.deviceId);
}
