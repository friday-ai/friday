import Satellite from '../../models/satellite';
import Log from '../../utils/log';
import State from '../../models/state';
import getById from './satellite.getById';

const logger = new Log();

export default async function getState(satellite: Satellite): Promise<State> {
  try {
    const thisSatellite = await getById(satellite.id);
    return thisSatellite.state;
  } catch (e) {
    throw logger.error(e);
  }
}
