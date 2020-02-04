import TestServer from '../../../../utils/testServer';
import DeviceType from '../../../../../src/core/device/device.interface';
import VariableType from '../../../../../src/core/variable/variable.interface';

describe('plugin.getById', () => {
  it('should return a plugin', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toEqual(
          {
            id: '33ddf1e2-3c51-4426-93af-3b0453ac0c1e',
            name: 'Zwave',
            version: '1.2.0',
            url: 'fake url',
            enabled: true,
            satelliteId: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f'
          });
      });
  });

  it('should return a plugin with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite', 'state', 'devices', 'variables']
        );
        if (plugin.state !== null) {
          expect(plugin.state).toBeObject();
          expect(plugin.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }

        if (plugin.satellite !== null) {
          expect(plugin.satellite).toBeObject();
          expect(plugin.satellite).toContainAllKeys(
            ['id', 'name', 'roomId']
          );
        }

        if (plugin.devices !== null) {
          expect(plugin.devices).toBeArray();
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).toBeObject();
            expect(device).toContainAllKeys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId']
            );
          });
        }

        if (plugin.variables !== null) {
          expect(plugin.variables).toBeArray();
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        }
      });
  });

  it('should return a plugin with satellite', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({'scope' : 'withSatellite'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'satellite']
        );
        if (plugin.satellite !== null) {
          expect(plugin.satellite).toBeObject();
          expect(plugin.satellite).toContainAllKeys(
            ['id', 'name', 'roomId']
          );
        }
      });
  });

  it('should return a plugin with state', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'state']
        );
        if (plugin.state !== null) {
          expect(plugin.state).toBeObject();
          expect(plugin.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }
      });
  });

  it('should return a plugin with devices', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({'scope' : 'withDevices'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'devices']
        );
        if (plugin.devices !== null) {
          expect(plugin.devices).toBeArray();
          plugin.devices!.forEach((device: DeviceType) => {
            expect(device).toBeObject();
            expect(device).toContainAllKeys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId']
            );
          });
        }
      });
  });

  it('should return a plugin with variables', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/plugin/33ddf1e2-3c51-4426-93af-3b0453ac0c1e')
      .query({'scope' : 'withVariables'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toContainAllKeys(
          ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'variables']
        );
        if (plugin.variables !== null) {
          expect(plugin.variables).toBeArray();
          plugin.variables!.forEach((variable: VariableType) => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        }
      });
  });
});
