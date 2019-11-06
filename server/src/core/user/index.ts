import create from './user.create';
import update from './user.update';
import destroy from './user.destroy';
import getAll from './user.getAll';
import getById from './user.getById';

/**
 * User
 */
export default class User {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
