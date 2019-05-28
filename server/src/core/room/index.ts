import create from './room.create';
import update from './room.update';
import destroy from './room.destroy';
import get from './room.get';
import getDevices from './room.getDevices';
import getSatellites from './room.getSatellites';

export default class Room {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
    getDevice = getDevices;
    getSatellites = getSatellites;
}
