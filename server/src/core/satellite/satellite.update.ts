import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';
const logger = new Log();

export default async function update(satellite: SatelliteType): Promise<SatelliteType> {
  try {
    const satelliteToUpdate = await Satellite.findByPk(satellite.id);

    if (satelliteToUpdate === null) {
      throw logger.error('Satellite not found');
    }
    satelliteToUpdate.update(satellite);
    let satelliteToReturn = <SatelliteType>satelliteToUpdate.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw logger.error(e);
  }
}
