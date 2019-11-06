import create from './satellite.create';
import update from './satellite.update';
import destroy from './satellite.destroy';
import getAll from './satellite.getAll';
import getById from './satellite.getById';

/**
 * Satellite
 */
export default class Satellite {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
