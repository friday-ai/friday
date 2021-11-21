import Log from '../../../../utils/log';
import MqttServer from '../../index';

const logger = new Log();

/*
 * @route('friday/master/satellite/heartbeat')
 * @param('Object', 'payload', '{satelliteId: string}')
 */
export default async function heartbeat(mqtt: MqttServer, payload: { satelliteId: string }) {
  logger.info(`Satellite heartbeat ${payload.satelliteId}`);
  await mqtt.friday.satellite.heartbeat(payload.satelliteId);
}
