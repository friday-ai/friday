import create from './user.create';
import update from './user.update';
import destroy from './user.destroy';
import get from './user.get';

export default class User {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
}
