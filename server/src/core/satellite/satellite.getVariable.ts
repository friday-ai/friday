import Satellite from '../../models/satellite';
import Log from '../../utils/log';
import Variable from '../..//models/variable';
import getSatellite from './satellite.getSatellites';


const logger = new Log();

export default async function getDevices(satellite: Satellite): Promise<Variable[]> {
  try {
    const thisSatellite = await getSatellite(satellite.id);
    return thisSatellite.variable;
  } catch (e) {
    throw logger.error(e);
  }
}
