import { expect, assert } from 'chai';
import server from '../../../../utils/request';
import VariableType from '../../../../../src/core/variable/variable.interface';
import PluginType from '../../../../../src/core/plugin/plugin.interface';

describe('GET /api/v1/satellite/:id', () => {
  it('should return a satellite', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).to.be.an('object');
        assert.deepEqual(res.body, {
          id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
          name: 'Main satellite',
          roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
          lastHeartbeat: '2020-04-08T22:00:00.000Z',
        });
      });
  });

  it('should return a satellite with full scope', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'full' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.have.all.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'room', 'state', 'variables', 'plugins'],
        );
        expect(satellite.room).to.be.an('object');
        expect(satellite.room).to.have.all.keys(
          ['id', 'name', 'houseId'],
        );
        if (satellite.state !== null) {
          expect(satellite.state).to.be.an('object');
          expect(satellite.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.have.all.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
        if (satellite.plugins !== null) {
          expect(satellite.plugins).to.be.an('array');
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.have.all.keys(
              ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
            );
          });
        }
      });
  });

  it('should return a satellite with room', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withRoom' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.have.all.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'room'],
        );
        expect(satellite.room).to.be.an('object');
        expect(satellite.room).to.have.all.keys(
          ['id', 'name', 'houseId'],
        );
      });
  });

  it('should return a satellite with state', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.have.all.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'state'],
        );
        if (satellite.state !== null) {
          expect(satellite.state).to.be.an('object');
          expect(satellite.state).to.have.all.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
      });
  });

  it('should return a satellite with variables', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.have.all.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'variables'],
        );
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.have.all.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
      });
  });

  it('should return a satellite with plugins', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .query({ scope: 'withPlugins' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.have.all.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'plugins'],
        );
        if (satellite.plugins !== null) {
          expect(satellite.plugins).to.be.an('array');
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.have.all.keys(
              ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
            );
          });
        }
      });
  });
});
