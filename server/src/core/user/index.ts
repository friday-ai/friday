import create from './user.create';
import update from './user.update';
import destroy from './user.destroy';
import getAll from './user.getAll';

export default class User {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
}
