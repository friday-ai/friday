import create from './plugin.create';
import update from './plugin.update';
import destroy from './plugin.destroy';
import getAll from './plugin.getAll';
import getById from './plugin.getById';

/**
 * Plugin
 */
export default class Plugin {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
