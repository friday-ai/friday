import { expect } from 'chai';
import Plugin from '../../../src/core/plugin/plugin';

let plugin: Plugin;

describe('Plugin.listAll', () => {
  before(async () => {
    plugin = global.FRIDAY.plugin;
  });

  it('should return all plugins', async () => {
    const plugins = await plugin.listAll();

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );
    });
  });

  it('should return all plugins with full scope', async () => {
    const plugins = await plugin.listAll({ scope: 'full' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );

      expect(p.state).to.be.an('object');
      expect(p.state).to.contains.keys(
        ['id', 'owner', 'ownerType', 'value'],
      );

      expect(p.satellite).to.be.an('object');
      expect(p.satellite).to.contains.keys(
        ['id', 'name', 'roomId'],
      );

      expect(p.devices).to.be.an('array');
      p.devices!.forEach((d) => {
        expect(d).to.contains.keys(
          ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
        );
      });

      expect(p.variables).to.be.an('array');
      p.variables!.forEach((v) => {
        expect(v).to.contains.keys(
          ['id', 'value', 'owner', 'ownerType', 'value'],
        );
      });
    });
  });

  it('should return all plugins with satellites', async () => {
    const plugins = await plugin.listAll({ scope: 'withSatellite' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );

      expect(p.satellite).to.be.an('object');
      expect(p.satellite).to.contains.keys(
        ['id', 'name', 'roomId'],
      );
    });
  });

  it('should return all plugins with state', async () => {
    const plugins = await plugin.listAll({ scope: 'withState' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );

      expect(p.state).to.be.an('object');
      expect(p.state).to.contains.keys(
        ['id', 'owner', 'ownerType', 'value'],
      );
    });
  });

  it('should return all plugins with devices', async () => {
    const plugins = await plugin.listAll({ scope: 'withDevices' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );

      expect(p.devices).to.be.an('array');
      p.devices!.forEach((d) => {
        expect(d).to.contains.keys(
          ['id', 'defaultName', 'defaultManufacturer', 'defaultModel', 'name', 'type', 'manufacturer', 'model', 'pluginSelector', 'viaDevice', 'roomId', 'pluginId'],
        );
      });
    });
  });

  it('should return all plugins with variables', async () => {
    const plugins = await plugin.listAll({ scope: 'withVariables' });

    expect(plugins).to.be.an('array');
    plugins.forEach((p) => {
      expect(p).to.contains.keys(
        ['id', 'dockerId', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
      );

      expect(p.variables).to.be.an('array');
      p.variables!.forEach((v) => {
        expect(v).to.contains.keys(
          ['id', 'value', 'owner', 'ownerType', 'value'],
        );
      });
    });
  });
});
