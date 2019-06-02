import create from './house.create';
import update from './house.update';
import destroy from './house.destroy';
import getAll from './house.getAll';
import getById from './house.getById';
import getRooms from './house.getRooms';
import getState from './house.getState';

export default class House {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
  getRooms = getRooms;
  getState = getState;
}
