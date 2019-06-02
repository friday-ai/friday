import create from './satellite.create';
import update from './satellite.update';
import destroy from './satellite.destroy';
import getAll from './satellite.getAll';
import getById from './satellite.getById';
import getRoom from './satellite.getRoom';
import getVariable from './satellite.getVariable';
import getState from './satellite.getState';

export default class Satellite {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getRoom = getRoom;
  getVariable = getVariable;
  getById = getById;
  getState = getState;
}
