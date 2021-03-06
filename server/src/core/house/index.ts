import create from './house.create';
import update from './house.update';
import destroy from './house.destroy';
import getAll from './house.getAll';
import getById from './house.getById';

/**
 * House
 */
export default class House {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
