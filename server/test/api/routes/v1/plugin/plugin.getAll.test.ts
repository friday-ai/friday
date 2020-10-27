import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import PluginType from '../../../../../src/core/plugin/plugin.interface';
import { admin, habitant } from '../../../../utils/apiToken';

describe('GET /api/v1/plugin', () => {
  it('should return all plugins', async () => {
    await server
      .get('/api/v1/plugin')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [{
          id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
          name: 'Zwave',
          version: '1.2.0',
          url: 'fake url',
          enabled: true,
          satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        },
        {
          id: '88b48273-15e6-4729-9199-0682677475f4',
          name: 'Xiaomi',
          version: '1.0.0',
          url: 'fake url',
          enabled: true,
          satelliteId: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
        },
        {
          id: '3a6b4974-6159-4792-a327-c3656f8bb9af',
          name: 'Philips Hue',
          version: '1.5.0',
          url: 'fake url',
          enabled: true,
          satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
        },
        ]);
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.have.all.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.have.all.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.have.all.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.have.all.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.have.all.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.have.all.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.have.all.keys(
              ['id', 'owner', 'ownerType', 'value'],
            );
          }

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.have.all.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          }

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.have.all.keys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
              );
            });
          }

          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite'],
          );

          if (plugin.satellite !== null) {
            expect(plugin.satellite).to.be.an('object');
            expect(plugin.satellite).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'state'],
          );
          if (plugin.state !== null) {
            expect(plugin.state).to.be.an('object');
            expect(plugin.state).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'devices'],
          );

          if (plugin.devices !== null) {
            expect(plugin.devices).to.be.an('array');
            plugin.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.have.all.keys(
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
          expect(plugin).to.have.all.keys(
            ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'variables'],
          );
          if (plugin.variables !== null) {
            expect(plugin.variables).to.be.an('array');
            plugin.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.have.all.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
        });
      });
  });
});
