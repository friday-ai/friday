import Satellite from '../../models/satellite';
import SatelliteType from './satellite.interface';
import Log from '../../utils/log';

interface SatelliteOptions {
  scope?: string;
  take?: number;
  skip?: number;
}
const logger = new Log();
const DEFAULT_OPTIONS: SatelliteOptions = {
  scope: '',
  take: 20,
  skip: 0
};

export default async function getAll(options?: SatelliteOptions): Promise<SatelliteType[]> {
  try {
    options = Object.assign({}, DEFAULT_OPTIONS, options);

    let satellites;

    if (options.scope !== '' && options.scope !== null && options.scope !== undefined) {
      satellites = await Satellite.scope(options.scope).findAll({
        limit: options.take,
        offset: options.skip
      });
    } else {
      satellites = await Satellite.findAll({
        limit: options.take,
        offset: options.skip
      });
    }

    const satellitesPlain = <SatelliteType[]>satellites.map((satellite) => {
      const satellitePlain = satellite.get({ plain: true });
      return satellitePlain;
    });

    return satellitesPlain;
  } catch (e) {
    throw logger.error(e);
  }
}
