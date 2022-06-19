import { assert, expect } from 'chai';
import { DEVICE_SUBTYPE_LIST } from '../../../src/config/device';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Device from '../../../src/core/device/device';

let device: Device;

describe('Device.getById', () => {
  before(async () => {
    device = global.FRIDAY.device;
  });

  it('should return a device', async () => {
    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    expect(deviceReturned).to.be.an('object');
    assert.deepEqual(deviceReturned, {
      id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
      name: 'Light',
      type: 'LIGHT',
      subType: DEVICE_SUBTYPE_LIST.LIGHT.RGB,
      variable: {},
      unit: '',
      value: 'on',
      roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
      pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
    });
  });

  it('should return a device with full scope', async () => {
    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'full');

    expect(deviceReturned).to.have.property('id');
    expect(deviceReturned).to.have.property('name');
    expect(deviceReturned).to.have.property('type');
    expect(deviceReturned).to.have.property('subType');
    expect(deviceReturned).to.have.property('variable');
    expect(deviceReturned).to.have.property('unit');
    expect(deviceReturned).to.have.property('value');
    expect(deviceReturned).to.have.property('roomId');
    expect(deviceReturned).to.have.property('pluginId');

    if (deviceReturned.state !== null) {
      expect(deviceReturned.state).to.be.an('object');
      expect(deviceReturned.state).to.have.property('id');
      expect(deviceReturned.state).to.have.property('owner');
      expect(deviceReturned.state).to.have.property('ownerType');
      expect(deviceReturned.state).to.have.property('value');
    }

    expect(deviceReturned.room).to.be.an('object');
    expect(deviceReturned.room).to.have.property('id');
    expect(deviceReturned.room).to.have.property('name');
    expect(deviceReturned.room).to.have.property('houseId');

    if (deviceReturned.plugin !== null) {
      expect(deviceReturned.plugin).to.be.an('object');
      expect(deviceReturned.plugin).to.have.property('id');
      expect(deviceReturned.plugin).to.have.property('name');
      expect(deviceReturned.plugin).to.have.property('version');
      expect(deviceReturned.plugin).to.have.property('url');
      expect(deviceReturned.plugin).to.have.property('enabled');
      expect(deviceReturned.plugin).to.have.property('satelliteId');
    }
  });

  it('should return a device with state', async () => {
    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withState');

    expect(deviceReturned).to.have.property('id');
    expect(deviceReturned).to.have.property('name');
    expect(deviceReturned).to.have.property('type');
    expect(deviceReturned).to.have.property('subType');
    expect(deviceReturned).to.have.property('variable');
    expect(deviceReturned).to.have.property('unit');
    expect(deviceReturned).to.have.property('value');
    expect(deviceReturned).to.have.property('roomId');
    expect(deviceReturned).to.have.property('pluginId');

    // TODO: The state cannot must be null
    if (deviceReturned.state !== null) {
      expect(deviceReturned.state).to.be.an('object');
      expect(deviceReturned.state).to.have.property('id');
      expect(deviceReturned.state).to.have.property('owner');
      expect(deviceReturned.state).to.have.property('ownerType');
      expect(deviceReturned.state).to.have.property('value');
    }
  });

  it('should return a device with room', async () => {
    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withRoom');

    expect(deviceReturned).to.have.property('id');
    expect(deviceReturned).to.have.property('name');
    expect(deviceReturned).to.have.property('type');
    expect(deviceReturned).to.have.property('subType');
    expect(deviceReturned).to.have.property('variable');
    expect(deviceReturned).to.have.property('unit');
    expect(deviceReturned).to.have.property('value');
    expect(deviceReturned).to.have.property('roomId');
    expect(deviceReturned).to.have.property('pluginId');

    expect(deviceReturned.room).to.be.an('object');
    expect(deviceReturned.room).to.have.property('id');
    expect(deviceReturned.room).to.have.property('name');
    expect(deviceReturned.room).to.have.property('houseId');
  });

  it('should return all Devices with plugin', async () => {
    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withPlugin');

    expect(deviceReturned).to.have.property('id');
    expect(deviceReturned).to.have.property('name');
    expect(deviceReturned).to.have.property('type');
    expect(deviceReturned).to.have.property('subType');
    expect(deviceReturned).to.have.property('variable');
    expect(deviceReturned).to.have.property('unit');
    expect(deviceReturned).to.have.property('value');
    expect(deviceReturned).to.have.property('roomId');
    expect(deviceReturned).to.have.property('pluginId');

    if (deviceReturned.plugin !== null) {
      expect(deviceReturned.plugin).to.be.an('object');
      expect(deviceReturned.plugin).to.have.property('id');
      expect(deviceReturned.plugin).to.have.property('name');
      expect(deviceReturned.plugin).to.have.property('version');
      expect(deviceReturned.plugin).to.have.property('url');
      expect(deviceReturned.plugin).to.have.property('enabled');
      expect(deviceReturned.plugin).to.have.property('satelliteId');
    }
  });

  it('should not found a device', async () => {
    const promise = device.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
