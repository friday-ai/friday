import create from './room.create';
import update from './room.update';
import destroy from './room.destroy';
import getAll from './room.getAll';
import getById from './room.getById';

/**
 * Room
 */
export default class Room {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
