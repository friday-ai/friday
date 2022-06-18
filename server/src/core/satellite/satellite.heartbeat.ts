import { NotFoundError } from '../../utils/decorators/error';
import Satellite from '../../models/satellite';
import { SatelliteType } from '../../config/entities';

export default async function heartbeat(id: string): Promise<SatelliteType> {
  const satellite = await Satellite.findByPk(id);
  if (satellite === null) {
    throw new NotFoundError({ name: 'Update a Satellite', message: 'Satellite not found', metadata: id });
  }
  satellite.lastHeartbeat = new Date();
  await satellite.update(satellite);

  return <SatelliteType>satellite.get({ plain: true });
}
