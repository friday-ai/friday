import create from './variable.create';
import update from './variable.update';
import destroy from './variable.destroy';
import getAll from './variable.getAll';
import getValue from './variable.getValue';

export default class Variable {
  create = create;
  update = update;
  destoy = destroy;
  getAll = getAll;
  getValue = getValue;
}
