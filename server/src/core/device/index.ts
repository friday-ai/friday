import create from './device.create';
import update from './device.update';
import destroy from './device.destroy';
import getAll from './device.getAll';
import getById from './device.getById';

/**
 * Device
 */
export default class Device {
  create = create;
  update = update;
  destroy = destroy;
  getAll = getAll;
  getById = getById;
}
