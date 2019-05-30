import create from './variable.create';
import update from './variable.update';
import destroy from './variable.destroy';
import get from './variable.get';
import getValue from './variable.getValue';

export default class Variable {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
    getValue = getValue;
}
