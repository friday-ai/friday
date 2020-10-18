import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function set(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Device set ${json.deviceName}`);
  this.friday.device.create(json.device);
}
