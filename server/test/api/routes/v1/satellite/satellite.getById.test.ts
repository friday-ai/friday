import TestServer from '../../../../utils/testServer';
import VariableType from '../../../../../src/core/variable/variable.interface';
import PluginType from '../../../../../src/core/plugin/plugin.interface';

describe('satellite.getById', () => {
  it('should return a satellite', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let plugin = res.body;
        expect(plugin).toBeObject();
        expect(plugin).toEqual(
          {
            id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
            name: 'Main satellite',
            roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
          });
      });
  });

  it('should return a satellite with full scope', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellite = res.body;
        expect(satellite).toBeObject();
        expect(satellite).toContainAllKeys(
          ['id', 'name', 'roomId', 'room', 'state', 'variables', 'plugins']
        );
        expect(satellite.room).toBeObject();
        expect(satellite.room).toContainAllKeys(
          ['id', 'name', 'houseId']
        );
        if (satellite.state !== null) {
          expect(satellite.state).toBeObject();
          expect(satellite.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        }
        if (satellite.plugins !== null) {
          expect(satellite.plugins).toBeArray();
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).toBeObject();
            expect(plugin).toContainAllKeys(
              ['id', 'name', 'version', 'url', 'enabled', 'satelliteId']
            );
          });
        }
      });
  });

  it('should return a satellite with room', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({'scope' : 'withRoom'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellite = res.body;
        expect(satellite).toBeObject();
        expect(satellite).toContainAllKeys(
          ['id', 'name', 'roomId', 'room']
        );
        expect(satellite.room).toBeObject();
        expect(satellite.room).toContainAllKeys(
          ['id', 'name', 'houseId']
        );
      });
  });

  it('should return a satellite with state', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellite = res.body;
        expect(satellite).toBeObject();
        expect(satellite).toContainAllKeys(
          ['id', 'name', 'roomId', 'state']
        );
        if (satellite.state !== null) {
          expect(satellite.state).toBeObject();
          expect(satellite.state).toContainAllKeys(
            ['id', 'owner', 'ownerType', 'value']
          );
        }
      });
  });

  it('should return a satellite with variables', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({'scope' : 'withVariables'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellite = res.body;
        expect(satellite).toBeObject();
        expect(satellite).toContainAllKeys(
          ['id', 'name', 'roomId', 'variables']
        );
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).toBeObject();
            expect(variable).toContainAllKeys(
              ['id', 'key', 'value', 'owner', 'ownerType']
            );
          });
        }
      });
  });

  it('should return a satellite with plugins', async () => {
    const server = await new TestServer();

    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({'scope' : 'withPlugins'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellite = res.body;
        expect(satellite).toBeObject();
        expect(satellite).toContainAllKeys(
          ['id', 'name', 'roomId', 'plugins']
        );
        if (satellite.plugins !== null) {
          expect(satellite.plugins).toBeArray();
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).toBeObject();
            expect(plugin).toContainAllKeys(
              ['id', 'name', 'version', 'url', 'enabled', 'satelliteId']
            );
          });
        }
      });
  });
});
