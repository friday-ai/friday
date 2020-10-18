import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function init(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Satellite init ${json.satelliteId}`);
  this.friday.satellite.update(json.satelliteId, json.satellite);
}
