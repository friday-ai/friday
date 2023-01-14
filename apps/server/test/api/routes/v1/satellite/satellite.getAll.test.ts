import { expect } from 'chai';
import { SatelliteAttributes } from '@friday/shared';
import server from '../../../../utils/request';

describe('GET /api/v1/satellite', () => {
  it('should return all satellites', async () => {
    await server
      .get('/api/v1/satellite')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
        });
      });
  });

  it('should return all satellites with full scope', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'room', 'state', 'variables', 'plugins']);

          expect(s.room).to.be.an('object');
          expect(s.room).to.contains.keys(['id', 'name', 'houseId']);

          expect(s.state).to.be.an('object');
          expect(s.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

          expect(s.variables).to.be.an('array');
          s.variables.forEach((variable) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
          });

          expect(s.plugins).to.be.an('array');
          s.plugins.forEach((plugin) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.contains.keys(['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
          });
        });
      });
  });

  it('should return all satellites with room', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withRoom' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'room']);

          expect(s.room).to.be.an('object');
          expect(s.room).to.contains.keys(['id', 'name', 'houseId']);
        });
      });
  });

  it('should return all satellites with state', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'state']);

          expect(s.state).to.be.an('object');
          expect(s.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
        });
      });
  });

  it('should return all satellites with variables', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'variables']);

          expect(s.variables).to.be.an('array');
          s.variables.forEach((variable) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
          });
        });
      });
  });

  it('should return all satellites with plugins', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withPlugins' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('array');
        res.body.forEach((s: SatelliteAttributes) => {
          expect(s).to.be.an('object');
          expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'plugins']);

          expect(s.plugins).to.be.an('array');
          s.plugins.forEach((plugin) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.contains.keys(['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
          });
        });
      });
  });
});
