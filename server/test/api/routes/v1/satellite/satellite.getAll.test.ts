import TestServer from '../../../../utils/testServer';
import SatelliteType from '../../../../../src/core/satellite/satellite.interface';

describe('satellite.getAll', () => {

  it('should return all satellites', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
            name: 'Main satellite',
            roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3'
          },
          {
            id: '4801badb-55d7-4bcd-9bf0-37a6cffe0bb1',
            name: 'Satellite 2',
            roomId: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc'
          }
        ]);
      });

  });

  it('should return all satellites with full scope', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellites = res.body;
        expect(satellites).toBeArray();
        satellites.forEach((satellite: SatelliteType) => {
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
            satellite.variables!.forEach(variable => {
              expect(variable).toBeObject();
              expect(variable).toContainAllKeys(
                ['id', 'key', 'value', 'owner', 'ownerType']
              );
            });
          }
          if (satellite.plugins !== null) {
            expect(satellite.plugins).toBeArray();
            satellite.plugins!.forEach(plugin => {
              expect(plugin).toBeObject();
              expect(plugin).toContainAllKeys(
                ['id', 'name', 'version', 'url', 'enabled', 'satelliteId']
              );
            });
          }
      });
    });
  });

  it('should return all satellites with room', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .query({'scope' : 'withRoom'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellites = res.body;
        expect(satellites).toBeArray();
        satellites.forEach((satellite: SatelliteType) => {
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
  });

  it('should return all satellites with state', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellites = res.body;
        expect(satellites).toBeArray();
        satellites.forEach((satellite: SatelliteType) => {
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
  });

  it('should return all satellites with variables', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .query({'scope' : 'withVariables'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellites = res.body;
        expect(satellites).toBeArray();
        satellites.forEach((satellite: SatelliteType) => {
          expect(satellite).toBeObject();
          expect(satellite).toContainAllKeys(
            ['id', 'name', 'roomId', 'variables']
          );
          if (satellite.variables !== null) {
            satellite.variables!.forEach(variable => {
              expect(variable).toBeObject();
              expect(variable).toContainAllKeys(
                ['id', 'key', 'value', 'owner', 'ownerType']
              );
            });
          }
        });
      });
  });

  it('should return all satellites with plugins', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/satellite')
      .query({'scope' : 'withPlugins'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let satellites = res.body;
        expect(satellites).toBeArray();
        satellites.forEach((satellite: SatelliteType) => {
          expect(satellite).toBeObject();
          expect(satellite).toContainAllKeys(
            ['id', 'name', 'roomId', 'plugins']
          );
          if (satellite.plugins !== null) {
            expect(satellite.plugins).toBeArray();
            satellite.plugins!.forEach(plugin => {
              expect(plugin).toBeObject();
              expect(plugin).toContainAllKeys(
                ['id', 'name', 'version', 'url', 'enabled', 'satelliteId']
              );
            });
          }
        });
      });
  });
});
