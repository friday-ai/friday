import Satellite from '../../models/satellite';
import Log from '../../utils/log';
import Variable from '../../models/variable';
import getById from './satellite.getById';


const logger = new Log();

export default async function getDevices(satellite: Satellite): Promise<Variable[]> {
  try {
    const thisSatellite = await getById(satellite.id);
    return thisSatellite.variables;
  } catch (e) {
    throw logger.error(e);
  }
}
