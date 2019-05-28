import create from './room.create';
import update from './room.update';
import destroy from './room.destroy';
import get from './room.get';

export default class Room {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
}
