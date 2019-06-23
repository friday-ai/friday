import create from './action.create';
import update from './action.update';
import destroy from './action.destroy';
import getAll from './action.getAll';
import getById from './action.getById';

export default class House {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
