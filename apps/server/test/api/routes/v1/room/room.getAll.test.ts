import { expect } from 'chai';
import { RoomAttributes } from '@friday/shared';
import server from '../../../../utils/request';

describe('GET /api/v1/room', () => {
  it('should return all rooms', async () => {
    await server
      .get('/api/v1/room')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId']);
        });
      });
  });

  it('should return all rooms with full scope', async () => {
    await server
      .get('/api/v1/room')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId', 'house', 'devices', 'satellites', 'state']);

          expect(r.house).to.be.an('object');
          expect(r.house).to.contains.keys(['id', 'name', 'latitude', 'longitude']);

          expect(r.state).to.be.an('object');
          expect(r.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

          expect(r.satellites).to.be.an('array');
          r.satellites.forEach((satellite) => {
            expect(satellite).to.be.an('object');
            expect(satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
          });

          expect(r.devices).to.be.an('array');
          r.devices.forEach((device) => {
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
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId', 'house']);

          expect(r.house).to.be.an('object');
          expect(r.house).to.contains.keys(['id', 'name', 'latitude', 'longitude']);
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
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId', 'state']);

          expect(r.state).to.be.an('object');
          expect(r.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
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
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId', 'devices']);

          expect(r.devices).to.be.an('array');
          r.devices.forEach((device) => {
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
        expect(res.body).to.be.an('array');
        res.body.forEach((r: RoomAttributes) => {
          expect(r).to.contains.keys(['id', 'name', 'houseId', 'satellites']);

          expect(r.satellites).to.be.an('array');
          r.satellites.forEach((satellite) => {
            expect(satellite).to.be.an('object');
            expect(satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
          });
        });
      });
  });
});
