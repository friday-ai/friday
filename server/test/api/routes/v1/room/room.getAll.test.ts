import TestServer from '../../../../utils/testServer';
import RoomType from '../../../../../src/core/room/room.interface';
describe('room.getAll', () => {

  it('should return all rooms', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
            name: 'Bedroom',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
          },
          {
            id: '6d619c11-5ff8-4489-93cf-348cf28c335b',
            name: 'Living room',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
          },
          {
            id: '406cd39b-eb55-433a-a36e-408c10869f58',
            name: 'Kitchen',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
          },
          {
            id: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
            name: 'Dining room',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c'
          }
        ]);
      });

  });

  it('should return all rooms with full scope', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .query({'scope' : 'full'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let rooms = res.body;
        expect(rooms).toBeArray();
        rooms.forEach((room: RoomType) => {
          expect(room).toBeObject();
          expect(room).toContainAllKeys(
            ['id', 'name', 'houseId', 'house', 'devices', 'satellites', 'state']
          );
          expect(room.house).toBeObject();
          expect(room.house).toContainAllKeys(
            ['id', 'name', 'latitude', 'longitude']
          );
          if (room.state !== null) {
            expect(room.state).toBeObject();
            expect(room.state).toContainAllKeys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }
          if (room.devices !== null) {
            room.devices!.forEach(device => {
              expect(device).toBeObject();
              expect(device).toContainAllKeys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId']
              );
            });
          }
          if (room.satellites !== null) {
            expect(room.satellites).toBeArray();
            room.satellites!.forEach(satellite => {
              expect(satellite).toBeObject();
              expect(satellite).toContainAllKeys(
                ['id', 'name', 'roomId']
              );
            });
          }
      });
    });
  });

  it('should return all rooms with house', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .query({'scope' : 'withHouse'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let rooms = res.body;
        expect(rooms).toBeArray();
        rooms.forEach((room: RoomType) => {
          expect(room).toBeObject();
          expect(room).toContainAllKeys(
            ['id', 'name', 'houseId', 'house']
          );
          expect(room.house).toBeObject();
          expect(room.house).toContainAllKeys(
            ['id', 'name', 'latitude', 'longitude']
          );
        });
      });
  });

  it('should return all rooms with state', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .query({'scope' : 'withState'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let rooms = res.body;
        expect(rooms).toBeArray();
        rooms.forEach((room: RoomType) => {
          expect(room).toBeObject();
          expect(room).toContainAllKeys(
            ['id', 'name', 'houseId', 'state']
          );
          if (room.state !== null) {
            expect(room.state).toBeObject();
            expect(room.state).toContainAllKeys(
              ['id', 'owner', 'ownerType', 'value']
            );
          }
        });
      });
  });

  it('should return all rooms with devices', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .query({'scope' : 'withDevices'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let rooms = res.body;
        expect(rooms).toBeArray();
        rooms.forEach((room: RoomType) => {
          expect(room).toBeObject();
          expect(room).toContainAllKeys(
            ['id', 'name', 'houseId', 'devices']
          );
          if (room.devices !== null) {
            room.devices!.forEach(device => {
              expect(device).toBeObject();
              expect(device).toContainAllKeys(
                ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId']
              );
            });
          }
        });
      });
  });

  it('should return all rooms with satellites', async () => {

    const server = await new TestServer();

    await server
      .get('/api/v1/room')
      .query({'scope' : 'withSatellites'})
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        let rooms = res.body;
        expect(rooms).toBeArray();
        rooms.forEach((room: RoomType) => {
          expect(room).toBeObject();
          expect(room).toContainAllKeys(
            ['id', 'name', 'houseId', 'satellites']
          );
          if (room.satellites !== null) {
            expect(room.satellites).toBeArray();
            room.satellites!.forEach(satellite => {
              expect(satellite).toBeObject();
              expect(satellite).toContainAllKeys(
                ['id', 'name', 'roomId']
              );
            });
          }
        });
      });
  });

});
