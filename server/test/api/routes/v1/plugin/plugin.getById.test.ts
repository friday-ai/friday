import { expect } from 'chai';
import server from '../../../../utils/request';
import { DeviceType, VariableType } from '../../../../../src/config/entities';
import { admin, guest, habitant } from '../../../../utils/apiToken';

describe('GET /api/v1/plugin/:id', () => {
  it('should return a plugin', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
        expect(plugin).to.be.an('object');
        expect(plugin).to.contains.keys(
          ['id', 'name', 'dockerId', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
        );
      });
  });

  it('should return a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
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
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.contains.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }

        if (plugin.variables !== null) {
          expect(plugin.variables).to.be.an('array');
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
      });
  });

  it('admin should have to read a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', admin)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
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
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.contains.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }

        if (plugin.variables !== null) {
          expect(plugin.variables).to.be.an('array');
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
      });
  });

  it('habitant should have to read a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', habitant)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
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
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.contains.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }

        if (plugin.variables !== null) {
          expect(plugin.variables).to.be.an('array');
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
      });
  });

  it('guest shouldn\'t have to read a plugin with full scope', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e', guest)
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(403);
  });

  it('should return a plugin with satellite', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withSatellite' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
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

  it('should return a plugin with state', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
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

  it('should return a plugin with devices', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
        expect(plugin).to.be.an('object');
        expect(plugin).to.contains.keys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'devices', 'lastHeartbeat'],
        );
        if (plugin.devices !== null) {
          expect(plugin.devices).to.be.an('array');
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.contains.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }
      });
  });

  it('should return a plugin with variables', async () => {
    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const plugin = res.body;
        expect(plugin).to.be.an('object');
        expect(plugin).to.contains.keys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'variables', 'lastHeartbeat'],
        );
        if (plugin.variables !== null) {
          expect(plugin.variables).to.be.an('array');
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
      });
  });
});
