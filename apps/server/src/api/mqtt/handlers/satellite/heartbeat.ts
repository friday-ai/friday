import logger from '../../../../utils/log';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/satellite/heartbeat')
 * @param('Object', 'payload', '{satelliteId: string}')
 */
export default async function heartbeat(friday: Friday, payload: { satelliteId: string }) {
  logger.info(`Satellite heartbeat ${payload.satelliteId}`);
  await friday.satellite.heartbeat(payload.satelliteId);
}
