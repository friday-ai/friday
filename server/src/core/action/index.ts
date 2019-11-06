import create from './action.create';
import update from './action.update';
import destroy from './action.destroy';
import getAll from './action.getAll';
import getById from './action.getById';

/**
 * Action
 */
export default class Action {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
