import { expect } from 'chai';
import { DeviceAttributes, SatelliteAttributes } from '@friday/shared';
import server from '../../../../utils/request';

describe('GET /api/v1/room/:id', () => {
  it('should return a room', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');
      });
  });

  it('should return a room with full scope', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId', 'house', 'devices', 'satellites', 'state']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

        expect(res.body.house).to.be.an('object');
        expect(res.body.house).to.contains.keys(['id', 'name', 'latitude', 'longitude']);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        res.body.devices.forEach((device: DeviceAttributes) => {
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

        expect(res.body.satellites).to.be.an('array');
        res.body.satellites?.forEach((satellite: SatelliteAttributes) => {
          expect(satellite).to.be.an('object');
          expect(satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
        });
      });
  });

  it('should return a room with house', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withHouse' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId', 'house']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

        expect(res.body.house).to.be.an('object');
        expect(res.body.house).to.contains.keys(['id', 'name', 'latitude', 'longitude']);
      });
  });

  it('should return a room with state', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId', 'state']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
      });
  });

  it('should return a room with devices', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withDevices' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId', 'devices']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

        res.body.devices.forEach((device: DeviceAttributes) => {
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

  it('should return a room with satellites', async () => {
    await server
      .get('/api/v1/room/c97ba085-ba97-4a30-bdd3-b7a62f6514dc')
      .query({ scope: 'withSatellites' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'houseId', 'satellites']);
        expect(res.body.id).to.equal('c97ba085-ba97-4a30-bdd3-b7a62f6514dc');

        expect(res.body.satellites).to.be.an('array');
        res.body.satellites?.forEach((satellite: SatelliteAttributes) => {
          expect(satellite).to.be.an('object');
          expect(satellite).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
        });
      });
  });
});
