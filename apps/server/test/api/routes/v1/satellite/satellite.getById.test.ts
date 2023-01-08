import { expect } from 'chai';
import server from '../../../../utils/request';
import { VariableType, PluginType } from '../../../../../src/config/entities';

describe('GET /api/v1/satellite/:id', () => {
  it('should return a satellite', async () => {
    await server
      .get('/api/v1/satellite/a7ef5f08-2bad-4489-95bf-b73fcf894d8f')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellite = res.body;
        expect(satellite).to.be.an('object');
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat'],
        );
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
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'room', 'state', 'variables', 'plugins'],
        );
        expect(satellite.room).to.be.an('object');
        expect(satellite.room).to.contains.keys(
          ['id', 'name', 'houseId'],
        );
        if (satellite.state !== null) {
          expect(satellite.state).to.be.an('object');
          expect(satellite.state).to.contains.keys(
            ['id', 'owner', 'ownerType', 'value'],
          );
        }
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
              ['id', 'key', 'value', 'owner', 'ownerType'],
            );
          });
        }
        if (satellite.plugins !== null) {
          expect(satellite.plugins).to.be.an('array');
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.contains.keys(
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
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'room'],
        );
        expect(satellite.room).to.be.an('object');
        expect(satellite.room).to.contains.keys(
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
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'state'],
        );
        if (satellite.state !== null) {
          expect(satellite.state).to.be.an('object');
          expect(satellite.state).to.contains.keys(
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
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'variables'],
        );
        if (satellite.variables !== null) {
          satellite.variables!.forEach((variable: VariableType) => {
            expect(variable).to.be.an('object');
            expect(variable).to.contains.keys(
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
        expect(satellite).to.contains.keys(
          ['id', 'name', 'roomId', 'lastHeartbeat', 'plugins'],
        );
        if (satellite.plugins !== null) {
          expect(satellite.plugins).to.be.an('array');
          satellite.plugins!.forEach((plugin: PluginType) => {
            expect(plugin).to.be.an('object');
            expect(plugin).to.contains.keys(
              ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
            );
          });
        }
      });
  });
});
