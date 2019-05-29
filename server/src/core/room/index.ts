import create from './room.create';
import update from './room.update';
import destroy from './room.destroy';
import get from './room.get';
import getRoom from './room.getRoom';
import getDevices from './room.getDevices';
import getSatellites from './room.getSatellites';
import getState from './room.getState';

export default class Room {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
    getRoom = getRoom;
    getDevice = getDevices;
    getSatellites = getSatellites;
    getState = getState;
}
