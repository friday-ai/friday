import { assert, expect } from 'chai';
import server from '../../../../utils/request';
import { RoomType } from '../../../../../src/config/entities';

describe('GET /api/v1/room', () => {
  it('should return all rooms', async () => {
    await server
      .get('/api/v1/room')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        assert.deepEqual(res.body, [
          {
            id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
            name: 'Bedroom',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          },
          {
            id: '6d619c11-5ff8-4489-93cf-348cf28c335b',
            name: 'Living room',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          },
          {
            id: '406cd39b-eb55-433a-a36e-408c10869f58',
            name: 'Kitchen',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          },
          {
            id: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
            name: 'Dining room',
            houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
          },
        ]);
      });
  });

  it('should return all rooms with full scope', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const rooms = res.body;
        expect(rooms).to.be.an('array');
        rooms.forEach((room: RoomType) => {
          expect(room).to.be.an('object');
          expect(room).to.contains.keys([
            'id',
            'name',
            'houseId',
            'house',
            'devices',
            'satellites',
            'state',
          ]);
          expect(room.house).to.be.an('object');
          expect(room.house).to.contains.keys([
            'id',
            'name',
            'latitude',
            'longitude',
          ]);
          if (room.state !== null) {
            expect(room.state).to.be.an('object');
            expect(room.state).to.contains.keys([
              'id',
              'owner',
              'ownerType',
              'value',
            ]);
          }
          if (room.devices !== null) {
            room.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys([
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
          }
          if (room.satellites !== null) {
            expect(room.satellites).to.be.an('array');
            room.satellites!.forEach((satellite) => {
              expect(satellite).to.be.an('object');
              expect(satellite).to.contains.keys([
                'id',
                'name',
                'roomId',
                'lastHeartbeat',
              ]);
            });
          }
        });
      });
  });

  it('should return all rooms with house', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'withHouse' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const rooms = res.body;
        expect(rooms).to.be.an('array');
        rooms.forEach((room: RoomType) => {
          expect(room).to.be.an('object');
          expect(room).to.contains.keys(['id', 'name', 'houseId', 'house']);
          expect(room.house).to.be.an('object');
          expect(room.house).to.contains.keys([
            'id',
            'name',
            'latitude',
            'longitude',
          ]);
        });
      });
  });

  it('should return all rooms with state', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const rooms = res.body;
        expect(rooms).to.be.an('array');
        rooms.forEach((room: RoomType) => {
          expect(room).to.be.an('object');
          expect(room).to.contains.keys(['id', 'name', 'houseId', 'state']);
          if (room.state !== null) {
            expect(room.state).to.be.an('object');
            expect(room.state).to.contains.keys([
              'id',
              'owner',
              'ownerType',
              'value',
            ]);
          }
        });
      });
  });

  it('should return all rooms with devices', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const rooms = res.body;
        expect(rooms).to.be.an('array');
        rooms.forEach((room: RoomType) => {
          expect(room).to.be.an('object');
          expect(room).to.contains.keys(['id', 'name', 'houseId', 'devices']);
          if (room.devices !== null) {
            room.devices!.forEach((device) => {
              expect(device).to.be.an('object');
              expect(device).to.contains.keys([
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
          }
        });
      });
  });

  it('should return all rooms with satellites', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'withSatellites' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const rooms = res.body;
        expect(rooms).to.be.an('array');
        rooms.forEach((room: RoomType) => {
          expect(room).to.be.an('object');
          expect(room).to.contains.keys([
            'id',
            'name',
            'houseId',
            'satellites',
          ]);
          if (room.satellites !== null) {
            expect(room.satellites).to.be.an('array');
            room.satellites!.forEach((satellite) => {
              expect(satellite).to.be.an('object');
              expect(satellite).to.contains.keys([
                'id',
                'name',
                'roomId',
                'lastHeartbeat',
              ]);
            });
          }
        });
      });
  });
});
