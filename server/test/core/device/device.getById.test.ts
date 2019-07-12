import { Device } from '../../../src/core/friday';
import 'jest-extended';

describe('device.getById', () => {
  const device = new Device();

  it('should return a device', async () => {

    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3');

    expect(deviceReturned).toEqual(
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
      });

  });

  it('should return a device with full scope', async () => {

    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'full');


    expect(deviceReturned).toHaveProperty('id');
    expect(deviceReturned).toHaveProperty('name');
    expect(deviceReturned).toHaveProperty('type');
    expect(deviceReturned).toHaveProperty('subType');
    expect(deviceReturned).toHaveProperty('variable');
    expect(deviceReturned).toHaveProperty('unit');
    expect(deviceReturned).toHaveProperty('value');
    expect(deviceReturned).toHaveProperty('roomId');
    expect(deviceReturned).toHaveProperty('pluginId');

    // TODO: The state cannot must be null
    if (deviceReturned.state !== null) {
      expect(deviceReturned.state).toBeObject();
      expect(deviceReturned.state).toHaveProperty('id');
      expect(deviceReturned.state).toHaveProperty('owner');
      expect(deviceReturned.state).toHaveProperty('ownerType');
      expect(deviceReturned.state).toHaveProperty('value');
    }

    expect(deviceReturned.room).toBeObject();
    expect(deviceReturned.room).toHaveProperty('id');
    expect(deviceReturned.room).toHaveProperty('name');
    expect(deviceReturned.room).toHaveProperty('houseId');

    if (deviceReturned.plugin !== null) {
      expect(deviceReturned.plugin).toBeObject();
      expect(deviceReturned.plugin).toHaveProperty('id');
      expect(deviceReturned.plugin).toHaveProperty('name');
      expect(deviceReturned.plugin).toHaveProperty('version');
      expect(deviceReturned.plugin).toHaveProperty('url');
      expect(deviceReturned.plugin).toHaveProperty('enabled');
      expect(deviceReturned.plugin).toHaveProperty('satelliteId');
    }

  });

  it('should return a device with state', async () => {

    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withState');

    expect(deviceReturned).toHaveProperty('id');
    expect(deviceReturned).toHaveProperty('name');
    expect(deviceReturned).toHaveProperty('type');
    expect(deviceReturned).toHaveProperty('subType');
    expect(deviceReturned).toHaveProperty('variable');
    expect(deviceReturned).toHaveProperty('unit');
    expect(deviceReturned).toHaveProperty('value');
    expect(deviceReturned).toHaveProperty('roomId');
    expect(deviceReturned).toHaveProperty('pluginId');

    // TODO: The state cannot must be null
    if (deviceReturned.state !== null) {
      expect(deviceReturned.state).toBeObject();
      expect(deviceReturned.state).toHaveProperty('id');
      expect(deviceReturned.state).toHaveProperty('owner');
      expect(deviceReturned.state).toHaveProperty('ownerType');
      expect(deviceReturned.state).toHaveProperty('value');
    }


  });

  it('should return a device with room', async () => {

    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withRoom');

    expect(deviceReturned).toHaveProperty('id');
    expect(deviceReturned).toHaveProperty('name');
    expect(deviceReturned).toHaveProperty('type');
    expect(deviceReturned).toHaveProperty('subType');
    expect(deviceReturned).toHaveProperty('variable');
    expect(deviceReturned).toHaveProperty('unit');
    expect(deviceReturned).toHaveProperty('value');
    expect(deviceReturned).toHaveProperty('roomId');
    expect(deviceReturned).toHaveProperty('pluginId');

    expect(deviceReturned.room).toBeObject();
    expect(deviceReturned.room).toHaveProperty('id');
    expect(deviceReturned.room).toHaveProperty('name');
    expect(deviceReturned.room).toHaveProperty('houseId');


  });

  it('should return all Devices with plugin', async () => {

    const deviceReturned = await device.getById('22b5b9ce-cd9e-404a-8c31-97350d684fd3', 'withPlugin');

    expect(deviceReturned).toHaveProperty('id');
    expect(deviceReturned).toHaveProperty('name');
    expect(deviceReturned).toHaveProperty('type');
    expect(deviceReturned).toHaveProperty('subType');
    expect(deviceReturned).toHaveProperty('variable');
    expect(deviceReturned).toHaveProperty('unit');
    expect(deviceReturned).toHaveProperty('value');
    expect(deviceReturned).toHaveProperty('roomId');
    expect(deviceReturned).toHaveProperty('pluginId');

    if (deviceReturned.plugin !== null) {
      expect(deviceReturned.plugin).toBeObject();
      expect(deviceReturned.plugin).toHaveProperty('id');
      expect(deviceReturned.plugin).toHaveProperty('name');
      expect(deviceReturned.plugin).toHaveProperty('version');
      expect(deviceReturned.plugin).toHaveProperty('url');
      expect(deviceReturned.plugin).toHaveProperty('enabled');
      expect(deviceReturned.plugin).toHaveProperty('satelliteId');
    }

  });

});
