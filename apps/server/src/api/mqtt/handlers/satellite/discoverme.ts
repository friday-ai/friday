import logger from '../../../../utils/log';
import { SatelliteType } from '../../../../config/entities';
import Friday from '../../../../core/friday';

/*
 * @route('friday/master/satellite/discoverme')
 * @param('Object', 'payload', '{satelliteName: string, satellite: SatelliteType}')
 */
export default async function discoverme(friday: Friday, payload: { satelliteName: string, satellite: SatelliteType }) {
  logger.info(`Satellite discover ${payload.satelliteName}`);
  await friday.satellite.create(payload.satellite);
}
