import logger from '../../../../utils/log';
import MqttServer from '../../index';
import { SatelliteType } from '../../../../config/entities';

/*
 * @route('friday/master/satellite/discoverme')
 * @param('Object', 'payload', '{satelliteName: string, satellite: SatelliteType}')
 */
export default async function discoverme(this: MqttServer, payload: { satelliteName: string, satellite: SatelliteType }) {
  logger.info(`Satellite discover ${payload.satelliteName}`);
  await this.friday.satellite.create(payload.satellite);
}
