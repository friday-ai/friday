import Satellite from '../../models/satellite';
import Log from '../../utils/log';
const logger = new Log();

export default async function get(): Promise<Satellite[]> {
  try {
    const satellites = await Satellite.findAll();
    return satellites;
  } catch (e) {
    throw logger.error(e);
  }
}
