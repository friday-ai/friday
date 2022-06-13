import logger from '../../../../utils/log';
import MqttServer from '../../index';
import SatelliteType from '../../../../core/satellite/satellite.interface';

/*
 * @route('friday/master/satellite/init')
 * @param('Object', 'payload', '{satelliteId: string, satellite: SatelliteType}')
 */
export default async function init(this: MqttServer, payload: { satelliteId: string, satellite: SatelliteType }) {
  logger.info(`Satellite init ${payload.satelliteId}`);
  await this.friday.satellite.update(payload.satelliteId, payload.satellite);
}
