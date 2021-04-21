import DeviceClass from '../../index';
import checkAvailableFeature from '../checkAvailableFeature';
import error from '../../../../utils/errors/coreError';

async function setBattery(this: DeviceClass, id: string, value: number) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BATTERY');
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id, value },
    });
  }
}

async function getBattery(this: DeviceClass, id: string) {
  try {
    const device = await this.getById(id);
    checkAvailableFeature(device, 'BATTERY');
    return await this.state.getByOwner(device.id!);
  } catch (e) {
    throw error({
      name: e.name, message: e.message, cause: e, metadata: { DeviceClass: this, id },
    });
  }
}

export default {
  setBattery,
  getBattery,
};
