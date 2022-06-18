import { expect } from 'chai';
import server from '../../../../utils/request';
import { PluginType } from '../../../../../src/config/entities';
import { admin, habitant } from '../../../../utils/apiToken';

describe('GET /api/v1/plugin', () => {
  it('should return all plugins', async () => {
    await server
      .get('/api/v1/plugin')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
          );
        });
      });
  });

  it('should return all plugins with full scope', async () => {
    await server
      .get('/api/v1/plugin')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables', 'lastHeartbeat'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.contains.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
        });
      });
  });

  it('admin should have to read all plugins with full scope', async () => {
    await server
      .get('/api/v1/plugin', admin)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables', 'lastHeartbeat'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.contains.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
        });
      });
  });

  it('habitant should have to read all plugins with full scope', async () => {
    await server
      .get('/api/v1/plugin', habitant)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables', 'lastHeartbeat'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.contains.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
        });
      });
  });

  it('should return all plugins with satellites', async () => {
    await server
      .get('/api/v1/plugin')
      .query({ scope: 'withSatellite' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'lastHeartbeat'],
          );

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.contains.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }
        });
      });
  });

  it('should return all plugins with state', async () => {
    await server
      .get('/api/v1/plugin')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'state', 'lastHeartbeat'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.contains.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }
        });
      });
  });

  it('should return all plugins with devices', async () => {
    await server
      .get('/api/v1/plugin')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'devices', 'lastHeartbeat'],
          );

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }
        });
      });
  });

  it('should return all plugins with variables', async () => {
    await server
      .get('/api/v1/plugin')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugins = res.body;
        expect(plugins).to.be.an('array');
        plugins.forEach((plugin: PluginType) => {
          expect(plugin).to.be.an('object');
          expect(plugin).to.contains.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'variables', 'lastHeartbeat'],
          );
          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
        });
      });
  });
});
