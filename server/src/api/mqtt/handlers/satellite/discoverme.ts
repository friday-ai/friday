import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function discoverme(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Satellite discover ${json.satelliteName}`);
  this.friday.satellite.create(json.satellite);
}
