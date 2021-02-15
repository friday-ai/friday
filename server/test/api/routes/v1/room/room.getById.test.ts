import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import DeviceType from '../../../../../src/core/device/device.interface';
import SatelliteType from '../../../../../src/core/satellite/satellite.interface';

describe('GET /api/v1/room/:id', () => {
  it('should return a room', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'c97ba085-ba97-4a30-bdd3-b7a62f6514dc',
          name: 'Bedroom',
          houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
        });
      });
  });

  it('should return a room with full scope', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const room = res.body;
        expect(room).to.be.an('object');
        expect(room).to.have.all.keys(
          ['id', 'name', 'houseId', 'house', 'devices', 'satellites', 'state'],
        );
        expect(room.house).to.be.an('object');
        expect(room.house).to.have.all.keys(
          ['id', 'name', 'latitude', 'longitude'],
        );
        if (room.state !== null) {
          expect(room.state).to.be.an('object');
          expect(room.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
        if (room.devices !== null) {
          room.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.have.all.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }
        if (room.satellites !== null) {
          expect(room.satellites).to.be.an('array');
          room.satellites!.forEach((satellite: SatelliteType) => {
            expect(satellite).to.be.an('object');
            expect(satellite).to.have.all.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          });
        }
      });
  });

  it('should return a room with house', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withHouse' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const room = res.body;
        expect(room).to.be.an('object');
        expect(room).to.have.all.keys(
          ['id', 'name', 'houseId', 'house'],
        );
        expect(room.house).to.be.an('object');
        expect(room.house).to.have.all.keys(
          ['id', 'name', 'latitude', 'longitude'],
        );
      });
  });

  it('should return a room with state', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const room = res.body;
        expect(room).to.be.an('object');
        expect(room).to.have.all.keys(
          ['id', 'name', 'houseId', 'state'],
        );
        if (room.state !== null) {
          expect(room.state).to.be.an('object');
          expect(room.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
      });
  });

  it('should return a room with devices', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const room = res.body;
        expect(room).to.be.an('object');
        expect(room).to.have.all.keys(
          ['id', 'name', 'houseId', 'devices'],
        );
        if (room.devices !== null) {
          room.devices!.forEach((device: DeviceType) => {
            expect(device).to.be.an('object');
            expect(device).to.have.all.keys(
              ['id', 'name', 'type', 'subType', 'variable', 'unit', 'value', 'roomId', 'pluginId'],
            );
          });
        }
      });
  });

  it('should return a room with satellites', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withSatellites' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const room = res.body;
        expect(room).to.be.an('object');
        expect(room).to.have.all.keys(
          ['id', 'name', 'houseId', 'satellites'],
        );
        if (room.satellites !== null) {
          expect(room.satellites).to.be.an('array');
          room.satellites!.forEach((satellite: SatelliteType) => {
            expect(satellite).to.be.an('object');
            expect(satellite).to.have.all.keys(
              ['id', 'name', 'roomId', 'lastHeartbeat'],
            );
          });
        }
      });
  });
});
