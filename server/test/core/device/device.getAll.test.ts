import { expect, assert } from 'chai';
import Device from '../../../src/core/device';
import { AvailableTypeOfDevice, AvailableSubTypeOfDevice } from '../../../src/utils/constants';

describe('Device.getAll', () => {
  const device = new Device();

  it('should return all devices', async () => {

    const devices = await device.getAll();

    expect(devices).to.be.an('array');
    assert.deepEqual(devices, [{
        id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        name: 'Light',
        type: AvailableTypeOfDevice.LIGHT,
        subType: AvailableSubTypeOfDevice.LIGHT_RGB,
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
      },
      {
        id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        name: 'Temperature',
        type: AvailableTypeOfDevice.SENSOR,
        subType: AvailableSubTypeOfDevice.SENSOR_TEMPERATURE,
        variable: '',
        unit: '°C',
        value: '23',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '88b48273-15e6-4729-9199-0682677475f4'
      }
    ]);
  });

  it('should return all devices with full scope', async () => {

    const devices = await device.getAll({ scope: 'full' });

    expect(devices).to.be.an('array');
    devices.forEach(d => {
      expect(d).to.have.property('id');
      expect(d).to.have.property('name');
      expect(d).to.have.property('type');
      expect(d).to.have.property('subType');
      expect(d).to.have.property('variable');
      expect(d).to.have.property('unit');
      expect(d).to.have.property('value');
      expect(d).to.have.property('roomId');
      expect(d).to.have.property('pluginId');

      // TODO: The state cannot must be null
      if (d.state !== null) {
        expect(d.state).to.be.an('object');
        expect(d.state).to.have.property('id');
        expect(d.state).to.have.property('owner');
        expect(d.state).to.have.property('ownerType');
        expect(d.state).to.have.property('value');
      }

      expect(d.room).to.be.an('object');
      expect(d.room).to.have.property('id');
      expect(d.room).to.have.property('name');
      expect(d.room).to.have.property('houseId');

      if (d.plugin !== null) {
        expect(d.plugin).to.be.an('object');
        expect(d.plugin).to.have.property('id');
        expect(d.plugin).to.have.property('name');
        expect(d.plugin).to.have.property('version');
        expect(d.plugin).to.have.property('url');
        expect(d.plugin).to.have.property('enabled');
        expect(d.plugin).to.have.property('satelliteId');
      }

    });
  });

  it('should return all devices with state', async () => {

    const devices = await device.getAll({ scope: 'withState' });

    expect(devices).to.be.an('array');
    devices.forEach(d => {
      expect(d).to.have.property('id');
      expect(d).to.have.property('name');
      expect(d).to.have.property('type');
      expect(d).to.have.property('subType');
      expect(d).to.have.property('variable');
      expect(d).to.have.property('unit');
      expect(d).to.have.property('value');
      expect(d).to.have.property('roomId');
      expect(d).to.have.property('pluginId');

      // TODO: The state cannot must be null
      if (d.state !== null) {
        expect(d.state).to.be.an('object');
        expect(d.state).to.have.property('id');
        expect(d.state).to.have.property('owner');
        expect(d.state).to.have.property('ownerType');
        expect(d.state).to.have.property('value');
      }

    });
  });

  it('should return all Devices with room', async () => {

    const devices = await device.getAll({ scope: 'withRoom' });

    expect(devices).to.be.an('array');
    devices.forEach(d => {
      expect(d).to.have.property('id');
      expect(d).to.have.property('name');
      expect(d).to.have.property('type');
      expect(d).to.have.property('subType');
      expect(d).to.have.property('variable');
      expect(d).to.have.property('unit');
      expect(d).to.have.property('value');
      expect(d).to.have.property('roomId');
      expect(d).to.have.property('pluginId');

      expect(d.room).to.be.an('object');
      expect(d.room).to.have.property('id');
      expect(d.room).to.have.property('name');
      expect(d.room).to.have.property('houseId');

    });
  });

  it('should return all Devices with plugin', async () => {

    const devices = await device.getAll({ scope: 'withPlugin' });

    expect(devices).to.be.an('array');
    devices.forEach(d => {
      expect(d).to.have.property('id');
      expect(d).to.have.property('name');
      expect(d).to.have.property('type');
      expect(d).to.have.property('subType');
      expect(d).to.have.property('variable');
      expect(d).to.have.property('unit');
      expect(d).to.have.property('value');
      expect(d).to.have.property('roomId');
      expect(d).to.have.property('pluginId');

      if (d.plugin !== null) {
        expect(d.plugin).to.be.an('object');
        expect(d.plugin).to.have.property('id');
        expect(d.plugin).to.have.property('name');
        expect(d.plugin).to.have.property('version');
        expect(d.plugin).to.have.property('url');
        expect(d.plugin).to.have.property('enabled');
        expect(d.plugin).to.have.property('satelliteId');
      }

    });
  });

});
