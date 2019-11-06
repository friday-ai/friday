import Plugin from '../../../src/core/plugin';
import 'jest-extended';

describe('plugin.getById', () => {
  const plugin = new Plugin();

  it('should return a plugin', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');

    expect(pluginReturned).toEqual(
      {
        id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
        name: 'Zwave',
        version: '1.2.0',
        url: 'fake url',
        enabled: true,
        satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
      });

  });

  it('should return a plugin with full scope', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'full');

    expect(pluginReturned).toHaveProperty('id');
    expect(pluginReturned).toHaveProperty('name');
    expect(pluginReturned).toHaveProperty('version');
    expect(pluginReturned).toHaveProperty('url');
    expect(pluginReturned).toHaveProperty('enabled');
    expect(pluginReturned).toHaveProperty('satelliteId');

    // TODO: The state cannot must be null
    if (pluginReturned.state !== null) {
      expect(pluginReturned.state).toBeObject();
      expect(pluginReturned.state).toHaveProperty('id');
      expect(pluginReturned.state).toHaveProperty('owner');
      expect(pluginReturned.state).toHaveProperty('ownerType');
      expect(pluginReturned.state).toHaveProperty('value');
    }

    if (pluginReturned.satellite !== null) {
      expect(pluginReturned.satellite).toBeObject();
      expect(pluginReturned.satellite).toHaveProperty('id');
      expect(pluginReturned.satellite).toHaveProperty('name');
      expect(pluginReturned.satellite).toHaveProperty('roomId');
    }

    if (pluginReturned.devices !== null) {
      expect(pluginReturned.devices).toBeArray();
      pluginReturned.devices!.forEach(d => {
        expect(d).toBeObject();
        expect(d).toHaveProperty('id');
        expect(d).toHaveProperty('name');
        expect(d).toHaveProperty('type');
        expect(d).toHaveProperty('subType');
        expect(d).toHaveProperty('variable');
        expect(d).toHaveProperty('unit');
        expect(d).toHaveProperty('value');
      });
    }

    if (pluginReturned.variables !== null) {
      expect(pluginReturned.variables).toBeArray();
      pluginReturned.variables!.forEach(v => {
        expect(v).toBeObject();
        expect(v).toHaveProperty('id');
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    }

  });

  it('should return a plugin with satellite', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withSatellite');

    expect(pluginReturned).toHaveProperty('id');
    expect(pluginReturned).toHaveProperty('name');
    expect(pluginReturned).toHaveProperty('version');
    expect(pluginReturned).toHaveProperty('url');
    expect(pluginReturned).toHaveProperty('enabled');
    expect(pluginReturned).toHaveProperty('satelliteId');

    if (pluginReturned.satellite !== null) {
      expect(pluginReturned.satellite).toBeObject();
      expect(pluginReturned.satellite).toHaveProperty('id');
      expect(pluginReturned.satellite).toHaveProperty('name');
      expect(pluginReturned.satellite).toHaveProperty('roomId');
    }

  });

  it('should return a plugin with state', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withState');

    expect(pluginReturned).toHaveProperty('id');
    expect(pluginReturned).toHaveProperty('name');
    expect(pluginReturned).toHaveProperty('version');
    expect(pluginReturned).toHaveProperty('url');
    expect(pluginReturned).toHaveProperty('enabled');
    expect(pluginReturned).toHaveProperty('satelliteId');

    // TODO: The state cannot must be null
    if (pluginReturned.state !== null) {
      expect(pluginReturned.state).toBeObject();
      expect(pluginReturned.state).toHaveProperty('id');
      expect(pluginReturned.state).toHaveProperty('owner');
      expect(pluginReturned.state).toHaveProperty('ownerType');
      expect(pluginReturned.state).toHaveProperty('value');
    }

  });

  it('should return a plugin with devices', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withDevices');

    expect(pluginReturned).toHaveProperty('id');
    expect(pluginReturned).toHaveProperty('name');
    expect(pluginReturned).toHaveProperty('version');
    expect(pluginReturned).toHaveProperty('url');
    expect(pluginReturned).toHaveProperty('enabled');
    expect(pluginReturned).toHaveProperty('satelliteId');

    if (pluginReturned.devices !== null) {
      expect(pluginReturned.devices).toBeArray();
      pluginReturned.devices!.forEach(d => {
        expect(d).toBeObject();
        expect(d).toHaveProperty('id');
        expect(d).toHaveProperty('name');
        expect(d).toHaveProperty('type');
        expect(d).toHaveProperty('subType');
        expect(d).toHaveProperty('variable');
        expect(d).toHaveProperty('unit');
        expect(d).toHaveProperty('value');
      });
    }

  });

  it('should return a plugin with variables', async () => {

    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withVariables');

    expect(pluginReturned).toHaveProperty('id');
    expect(pluginReturned).toHaveProperty('name');
    expect(pluginReturned).toHaveProperty('version');
    expect(pluginReturned).toHaveProperty('url');
    expect(pluginReturned).toHaveProperty('enabled');
    expect(pluginReturned).toHaveProperty('satelliteId');

    if (pluginReturned.variables !== null) {
      expect(pluginReturned.variables).toBeArray();
      pluginReturned.variables!.forEach(v => {
        expect(v).toBeObject();
        expect(v).toHaveProperty('id');
        expect(v).toHaveProperty('key');
        expect(v).toHaveProperty('value');
        expect(v).toHaveProperty('owner');
        expect(v).toHaveProperty('ownerType');
      });
    }

  });

});
