import { SatelliteAttributes } from '@friday-ai/shared';
import { NotFoundError } from '../../utils/decorators/error';
import Satellite from '../../models/satellite';

export default async function heartbeat(id: string): Promise<SatelliteAttributes> {
  const satellite = await Satellite.findByPk(id);
  if (satellite === null) {
    throw new NotFoundError({ name: 'Update a Satellite', message: 'Satellite not found', metadata: id });
  }

  const satelliteFind = satellite.get({ plain: true });
  satelliteFind.lastHeartbeat = new Date();
  await satellite.update(satelliteFind);

  return <SatelliteAttributes>satellite.get({ plain: true });
}
