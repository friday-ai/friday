import error, { NotFoundError } from '../../utils/errors/coreError';
import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';

export default async function heartbeat(id: string): Promise<SatelliteType> {
  try {
    const satelliteToUpdate = await Satellite.findByPk(id);
    if (satelliteToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Satellite', message: 'Satellite not found', metadata: id });
    }
    satelliteToUpdate.lastHeartbeat = new Date();
    satelliteToUpdate.update(satelliteToUpdate);
    const satelliteToReturn = <SatelliteType>satelliteToUpdate.get({ plain: true });
    return satelliteToReturn;
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
