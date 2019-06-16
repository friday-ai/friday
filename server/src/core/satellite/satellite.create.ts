import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function create(satellite: SatelliteType): Promise<SatelliteType> {
  try {
    const createdSatellite = await Satellite.create(satellite);
    let satelliteToReturn = <SatelliteType>createdSatellite.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
