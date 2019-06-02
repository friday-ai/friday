import create from './house.create';
import update from './house.update';
import destroy from './house.destroy';
import get from './house.get';
import getHouse from './house.getHouse';
import getRooms from './house.getRooms';
import getState from './house.getState';

export default class House {
  create = create;
  update = update;
  destoy = destroy;
  get = get;
  getHouse = getHouse;
  getRooms = getRooms;
  getState = getState;
}
