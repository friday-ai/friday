import create from './scene.create';
import update from './scene.update';
import destroy from './scene.destroy';
import getAll from './scene.getAll';
import getById from './scene.getById';

export default class Satellite {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getById = getById;
}
