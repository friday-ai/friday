import create from './satellite.create';
import update from './satellite.update';
import destroy from './satellite.destroy';
import getAll from './satellite.getAll';
import getById from './satellite.getById';
import heartbeat from './satellite.heartbeat';
import discoverme from './satellite.discoverme';

/**
 * Satellite
 */
export default class Satellite {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
  heartbeat = heartbeat;
  discoverme = discoverme;
}
