import { SatelliteAttributes } from '@friday/shared';
import logger from '../../../../utils/log';
import Friday from '../../../../core/friday';
/*
 * @route('friday/master/satellite/init')
 * @param('Object', 'payload', '{satelliteId: string, satellite: SatelliteType}')
 */
export default async function init(friday: Friday, payload: { satelliteId: string; satellite: SatelliteAttributes }) {
  logger.info(`Satellite init ${payload.satelliteId}`);
  await friday.satellite.update(payload.satelliteId, payload.satellite);
}
