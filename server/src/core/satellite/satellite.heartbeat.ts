import error, { NotFoundError } from '../../utils/errors/coreError';
import Satellite from '../../models/satellite';

export default async function heartbeat(id: string): Promise<any> {
  try {
    const satelliteToUpdate = await Satellite.findByPk(id);
    if (satelliteToUpdate === null) {
      throw new NotFoundError({ name: 'Update a Satellite', message: 'Satellite not found', metadata: id });
    }
    satelliteToUpdate.lastHeartbeat = new Date();
    satelliteToUpdate.update(satelliteToUpdate);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: id,
    });
  }
}
