import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';
import StateClass from '../state/index';

/**
 * Device
 */
export default class Device {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;

  public state: StateClass;

  constructor(state: StateClass) {
    this.state = state;
  }
}
