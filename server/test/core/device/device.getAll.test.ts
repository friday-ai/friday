import Device from '../../../src/core/device';
import 'jest-extended';

describe('device.getAll', () => {
  const device = new Device();

  it('should return all devices', async () => {

    const devices = await device.getAll();

    expect(devices).toEqual([
      {
        id: '22b5b9ce-cd9e-404a-8c31-97350d684fd3',
        name: 'Light',
        type: 'light',
        subType: 'light_rgb',
        variable: '',
        unit: '',
        value: 'on',
        roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
        pluginId: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e'
      },
      {
        id: 'cc306435-eb0f-455c-b79d-a684b171e04d',
        name: 'Temperature',
        type: 'sensor',
        subType: 'sensor_temperature',
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

    expect(devices).toBeArray();
    devices.forEach(d => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('subType');
      expect(d).toHaveProperty('variable');
      expect(d).toHaveProperty('unit');
      expect(d).toHaveProperty('value');
      expect(d).toHaveProperty('roomId');
      expect(d).toHaveProperty('pluginId');

      // TODO: The state cannot must be null
      if (d.state !== null) {
        expect(d.state).toBeObject();
        expect(d.state).toHaveProperty('id');
        expect(d.state).toHaveProperty('owner');
        expect(d.state).toHaveProperty('ownerType');
        expect(d.state).toHaveProperty('value');
      }

      expect(d.room).toBeObject();
      expect(d.room).toHaveProperty('id');
      expect(d.room).toHaveProperty('name');
      expect(d.room).toHaveProperty('houseId');

      if (d.plugin !== null) {
        expect(d.plugin).toBeObject();
        expect(d.plugin).toHaveProperty('id');
        expect(d.plugin).toHaveProperty('name');
        expect(d.plugin).toHaveProperty('version');
        expect(d.plugin).toHaveProperty('url');
        expect(d.plugin).toHaveProperty('enabled');
        expect(d.plugin).toHaveProperty('satelliteId');
      }

    });

  });

  it('should return all devices with state', async () => {

    const devices = await device.getAll({ scope: 'withState' });

    expect(devices).toBeArray();
    devices.forEach(d => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('subType');
      expect(d).toHaveProperty('variable');
      expect(d).toHaveProperty('unit');
      expect(d).toHaveProperty('value');
      expect(d).toHaveProperty('roomId');
      expect(d).toHaveProperty('pluginId');

      // TODO: The state cannot must be null
      if (d.state !== null) {
        expect(d.state).toBeObject();
        expect(d.state).toHaveProperty('id');
        expect(d.state).toHaveProperty('owner');
        expect(d.state).toHaveProperty('ownerType');
        expect(d.state).toHaveProperty('value');
      }

    });

  });

  it('should return all Devices with room', async () => {

    const devices = await device.getAll({ scope: 'withRoom' });

    expect(devices).toBeArray();
    devices.forEach(d => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('subType');
      expect(d).toHaveProperty('variable');
      expect(d).toHaveProperty('unit');
      expect(d).toHaveProperty('value');
      expect(d).toHaveProperty('roomId');
      expect(d).toHaveProperty('pluginId');

      expect(d.room).toBeObject();
      expect(d.room).toHaveProperty('id');
      expect(d.room).toHaveProperty('name');
      expect(d.room).toHaveProperty('houseId');

    });

  });

  it('should return all Devices with plugin', async () => {

    const devices = await device.getAll({ scope: 'withPlugin' });

    expect(devices).toBeArray();
    devices.forEach(d => {
      expect(d).toHaveProperty('id');
      expect(d).toHaveProperty('name');
      expect(d).toHaveProperty('type');
      expect(d).toHaveProperty('subType');
      expect(d).toHaveProperty('variable');
      expect(d).toHaveProperty('unit');
      expect(d).toHaveProperty('value');
      expect(d).toHaveProperty('roomId');
      expect(d).toHaveProperty('pluginId');

      if (d.plugin !== null) {
        expect(d.plugin).toBeObject();
        expect(d.plugin).toHaveProperty('id');
        expect(d.plugin).toHaveProperty('name');
        expect(d.plugin).toHaveProperty('version');
        expect(d.plugin).toHaveProperty('url');
        expect(d.plugin).toHaveProperty('enabled');
        expect(d.plugin).toHaveProperty('satelliteId');
      }

    });

  });

});
