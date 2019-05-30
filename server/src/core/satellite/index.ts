import create from './satellite.create';
import update from './satellite.update';
import destroy from './satellite.destroy';
import get from './satellite.get';
import getSatellites from './satellite.getSatellites';
import getRoom from './satellite.getRoom';
import getVariable from './satellite.getVariable';
import getState from './satellite.getState';

export default class satellite {
    create = create;
    update = update;
    destoy = destroy;
    get = get;
    getRoom = getRoom;
    getVariable = getVariable;
    getSatellites = getSatellites;
    getState = getState;
}
