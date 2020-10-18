import Log from '../../../../utils/log';
import MqttServer from '../../index';

export default function heartbeat(this: MqttServer, message: string) {
  const logger = new Log();
  const json = JSON.parse(message);
  logger.info(`Satellite heartbeat ${json.satelliteId}`);
  // this.friday.satellite.heartbeat();
}
