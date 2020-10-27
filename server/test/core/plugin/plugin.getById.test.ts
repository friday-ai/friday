import { expect, assert } from 'chai';
import Plugin from '../../../src/core/plugin';

describe('Plugin.getById', () => {
  const plugin = new Plugin();

  it('should return a plugin', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');

    expect(pluginReturned).to.be.an('object');
    assert.deepEqual(pluginReturned, {
      id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
      name: 'Zwave',
      version: '1.2.0',
      url: 'fake url',
      enabled: true,
      satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      lastHeartbeat: new Date('2020-04-08T22:00:00.000Z'),
    });
  });

  it('should return a plugin with full scope', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'full');

    expect(pluginReturned).to.have.property('id');
    expect(pluginReturned).to.have.property('name');
    expect(pluginReturned).to.have.property('version');
    expect(pluginReturned).to.have.property('url');
    expect(pluginReturned).to.have.property('enabled');
    expect(pluginReturned).to.have.property('satelliteId');
    expect(pluginReturned).to.have.property('lastHeartbeat');

    // TODO: The state cannot must be null
    if (pluginReturned.state !== null) {
      expect(pluginReturned.state).to.be.an('object');
      expect(pluginReturned.state).to.have.property('id');
      expect(pluginReturned.state).to.have.property('owner');
      expect(pluginReturned.state).to.have.property('ownerType');
      expect(pluginReturned.state).to.have.property('value');
    }

    if (pluginReturned.satellite !== null) {
      expect(pluginReturned.satellite).to.be.an('object');
      expect(pluginReturned.satellite).to.have.property('id');
      expect(pluginReturned.satellite).to.have.property('name');
      expect(pluginReturned.satellite).to.have.property('roomId');
    }

    if (pluginReturned.devices !== null) {
      expect(pluginReturned.devices).to.be.an('array');
      pluginReturned.devices!.forEach((d) => {
        expect(d).to.be.an('object');
        expect(d).to.have.property('id');
        expect(d).to.have.property('name');
        expect(d).to.have.property('type');
        expect(d).to.have.property('subType');
        expect(d).to.have.property('variable');
        expect(d).to.have.property('unit');
        expect(d).to.have.property('value');
      });
    }

    if (pluginReturned.variables !== null) {
      expect(pluginReturned.variables).to.be.an('array');
      pluginReturned.variables!.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.have.property('id');
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    }
  });

  it('should return a plugin with satellite', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withSatellite');

    expect(pluginReturned).to.have.property('id');
    expect(pluginReturned).to.have.property('name');
    expect(pluginReturned).to.have.property('version');
    expect(pluginReturned).to.have.property('url');
    expect(pluginReturned).to.have.property('enabled');
    expect(pluginReturned).to.have.property('satelliteId');
    expect(pluginReturned).to.have.property('lastHeartbeat');

    if (pluginReturned.satellite !== null) {
      expect(pluginReturned.satellite).to.be.an('object');
      expect(pluginReturned.satellite).to.have.property('id');
      expect(pluginReturned.satellite).to.have.property('name');
      expect(pluginReturned.satellite).to.have.property('roomId');
    }
  });

  it('should return a plugin with state', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withState');

    expect(pluginReturned).to.have.property('id');
    expect(pluginReturned).to.have.property('name');
    expect(pluginReturned).to.have.property('version');
    expect(pluginReturned).to.have.property('url');
    expect(pluginReturned).to.have.property('enabled');
    expect(pluginReturned).to.have.property('satelliteId');
    expect(pluginReturned).to.have.property('lastHeartbeat');

    // TODO: The state cannot must be null
    if (pluginReturned.state !== null) {
      expect(pluginReturned.state).to.be.an('object');
      expect(pluginReturned.state).to.have.property('id');
      expect(pluginReturned.state).to.have.property('owner');
      expect(pluginReturned.state).to.have.property('ownerType');
      expect(pluginReturned.state).to.have.property('value');
    }
  });

  it('should return a plugin with devices', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withDevices');

    expect(pluginReturned).to.have.property('id');
    expect(pluginReturned).to.have.property('name');
    expect(pluginReturned).to.have.property('version');
    expect(pluginReturned).to.have.property('url');
    expect(pluginReturned).to.have.property('enabled');
    expect(pluginReturned).to.have.property('satelliteId');
    expect(pluginReturned).to.have.property('lastHeartbeat');

    if (pluginReturned.devices !== null) {
      expect(pluginReturned.devices).to.be.an('array');
      pluginReturned.devices!.forEach((d) => {
        expect(d).to.be.an('object');
        expect(d).to.have.property('id');
        expect(d).to.have.property('name');
        expect(d).to.have.property('type');
        expect(d).to.have.property('subType');
        expect(d).to.have.property('variable');
        expect(d).to.have.property('unit');
        expect(d).to.have.property('value');
      });
    }
  });

  it('should return a plugin with variables', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withVariables');

    expect(pluginReturned).to.have.property('id');
    expect(pluginReturned).to.have.property('name');
    expect(pluginReturned).to.have.property('version');
    expect(pluginReturned).to.have.property('url');
    expect(pluginReturned).to.have.property('enabled');
    expect(pluginReturned).to.have.property('satelliteId');
    expect(pluginReturned).to.have.property('lastHeartbeat');

    if (pluginReturned.variables !== null) {
      expect(pluginReturned.variables).to.be.an('array');
      pluginReturned.variables!.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.have.property('id');
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    }
  });
});
