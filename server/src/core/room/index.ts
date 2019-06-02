import create from './room.create';
import update from './room.update';
import destroy from './room.destroy';
import getAll from './room.getAll';
import getById from './room.getById';
import getDevices from './room.getDevices';
import getSatellites from './room.getSatellites';
import getState from './room.getState';

export default class Room {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
  getDevice = getDevices;
  getSatellites = getSatellites;
  getState = getState;
}
