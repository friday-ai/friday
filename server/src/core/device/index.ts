import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';

export default class House {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
