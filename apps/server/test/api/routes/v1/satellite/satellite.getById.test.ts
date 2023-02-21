import { PluginAttributes, VariableAttributes } from '@friday-ai/shared';
import { expect } from 'chai';
import server from '../../../../utils/request';

describe('GET /api/v1/satellite/:id', () => {
  it('should return a satellite', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');
      });
  });

  it('should return a satellite with full scope', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'room', 'state', 'variables', 'plugins']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

        expect(res.body.room).to.be.an('object');
        expect(res.body.room).to.contains.keys(['id', 'name', 'houseId']);

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

        res.body.variables.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });

        expect(res.body.plugins).to.be.an('array');
        res.body.plugins?.forEach((p: PluginAttributes) => {
          expect(p).to.be.an('object');
          expect(p).to.contains.keys(['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
        });
      });
  });

  it('should return a satellite with room', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withRoom' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'room']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

        expect(res.body.room).to.be.an('object');
        expect(res.body.room).to.contains.keys(['id', 'name', 'houseId']);
      });
  });

  it('should return a satellite with state', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'state']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

        expect(res.body.state).to.be.an('object');
        expect(res.body.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
      });
  });

  it('should return a satellite with variables', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'variables']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

        res.body.variables.forEach((v: VariableAttributes) => {
          expect(v).to.be.an('object');
          expect(v).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
        });
      });
  });

  it('should return a satellite with plugins', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withPlugins' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'plugins']);
        expect(res.body.id).to.equal('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

        expect(res.body.plugins).to.be.an('array');
        res.body.plugins?.forEach((p: PluginAttributes) => {
          expect(p).to.be.an('object');
          expect(p).to.contains.keys(['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat']);
        });
      });
  });
});
