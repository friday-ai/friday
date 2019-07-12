import create from './trigger.create';
import update from './trigger.update';
import destroy from './trigger.destroy';
import getAll from './trigger.getAll';
import getById from './trigger.getById';

export default class Trigger {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
