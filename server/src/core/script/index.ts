import create from './script.create';
import update from './script.update';
import destroy from './script.destroy';
import getAll from './script.getAll';
import getById from './script.getById';

/**
 * Script
 */
export default class Script {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
