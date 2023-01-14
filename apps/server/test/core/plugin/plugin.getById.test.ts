import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;

describe('Plugin.getById', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it('should return a plugin', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned).to.contains.keys(['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
  });

  it('should return a plugin with full scope', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'full');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys([
      'id',
      'dockerId',
      'name',
      'version',
      'url',
      'enabled',
      'satelliteId',
      'lastHeartbeat',
      'state',
      'satellite',
      'devices',
      'variables',
    ]);

    expect(pluginReturned.state).to.be.an('object');
    expect(pluginReturned.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

    expect(pluginReturned.satellite).to.be.an('object');
    expect(pluginReturned.satellite).to.contains.keys(['id', 'name', 'roomId']);

    expect(pluginReturned.devices).to.be.an('array');
    pluginReturned.devices.forEach((d) => {
      expect(d).to.contains.keys([
        'id',
        'defaultName',
        'defaultManufacturer',
        'defaultModel',
        'name',
        'type',
        'manufacturer',
        'model',
        'pluginSelector',
        'viaDevice',
        'roomId',
        'pluginId',
      ]);
    });

    expect(pluginReturned.variables).to.be.an('array');
    pluginReturned.variables.forEach((v) => {
      expect(v).to.contains.keys(['id', 'value', 'owner', 'ownerType', 'value']);
    });
  });

  it('should return a plugin with satellite', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withSatellite');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys(['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'satellite']);

    expect(pluginReturned.satellite).to.be.an('object');
    expect(pluginReturned.satellite).to.contains.keys(['id', 'name', 'roomId']);
  });

  it('should return a plugin with state', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withState');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys(['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'state']);

    expect(pluginReturned.state).to.be.an('object');
    expect(pluginReturned.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
  });

  it('should return a plugin with devices', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withDevices');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys(['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'devices']);

    expect(pluginReturned.devices).to.be.an('array');
    pluginReturned.devices.forEach((d) => {
      expect(d).to.contains.keys([
        'id',
        'defaultName',
        'defaultManufacturer',
        'defaultModel',
        'name',
        'type',
        'manufacturer',
        'model',
        'pluginSelector',
        'viaDevice',
        'roomId',
        'pluginId',
      ]);
    });
  });

  it('should return a plugin with variables', async () => {
    const pluginReturned = await plugin.getById('33ddf1e2-3c51-4426-93af-3b0453ac0c1e', 'withVariables');

    expect(pluginReturned).to.be.an('object');
    expect(pluginReturned.id).to.equal('33ddf1e2-3c51-4426-93af-3b0453ac0c1e');
    expect(pluginReturned).to.contains.keys(['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat', 'variables']);

    expect(pluginReturned.variables).to.be.an('array');
    pluginReturned.variables.forEach((v) => {
      expect(v).to.contains.keys(['id', 'value', 'owner', 'ownerType', 'value']);
    });
  });

  it('should not found a plugin', async () => {
    const promise = plugin.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
