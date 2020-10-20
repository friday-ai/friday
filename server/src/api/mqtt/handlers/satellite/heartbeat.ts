import Log from '../../../../utils/log';
import MqttServer from '../../index';

const logger = new Log();

export default async function heartbeat(this: MqttServer, payload: { satelliteId: string }) {
  logger.info(`Satellite heartbeat ${payload.satelliteId}`);
  // await this.friday.satellite.heartbeat();
}
