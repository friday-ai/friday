import create from './variable.create';
import update from './variable.update';
import destroy from './variable.destroy';
import getValue from './variable.getValue';

/**
 * Variable
 */
export default class Variable {
  create = create;
  update = update;
  destoy = destroy;
  getValue = getValue;
}
