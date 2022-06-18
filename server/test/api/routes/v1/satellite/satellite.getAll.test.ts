import { expect } from 'chai';
import server from '../../../../utils/request';
import { SatelliteType } from '../../../../../src/config/entities';

describe('GET /api/v1/satellite', () => {
  it('should return all satellites', async () => {
    await server
      .get('/api/v1/satellite')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
          expect(satellite).to.be.an('object');
          expect(satellite).to.contains.keys(
            ['id', 'name', 'roomId', 'lastHeartbeat'],
          );
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
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
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
            satellite.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
          if (satellite.plugins !== null) {
            expect(satellite.plugins).to.be.an('array');
            satellite.plugins!.forEach((plugin) => {
              expect(plugin).to.be.an('object');
              expect(plugin).to.contains.keys(
                ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
              );
            });
          }
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
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
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
  });

  it('should return all satellites with state', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withState' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
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
  });

  it('should return all satellites with variables', async () => {
    await server
      .get('/api/v1/satellite')
      .query({ scope: 'withVariables' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
          expect(satellite).to.be.an('object');
          expect(satellite).to.contains.keys(
            ['id', 'name', 'roomId', 'lastHeartbeat', 'variables'],
          );
          if (satellite.variables !== null) {
            satellite.variables!.forEach((variable) => {
              expect(variable).to.be.an('object');
              expect(variable).to.contains.keys(
                ['id', 'key', 'value', 'owner', 'ownerType'],
              );
            });
          }
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
        const satellites = res.body;
        expect(satellites).to.be.an('array');
        satellites.forEach((satellite: SatelliteType) => {
          expect(satellite).to.be.an('object');
          expect(satellite).to.contains.keys(
            ['id', 'name', 'roomId', 'lastHeartbeat', 'plugins'],
          );
          if (satellite.plugins !== null) {
            expect(satellite.plugins).to.be.an('array');
            satellite.plugins!.forEach((plugin) => {
              expect(plugin).to.be.an('object');
              expect(plugin).to.contains.keys(
                ['id', 'name', 'version', 'url', 'enabled', 'satelliteId', 'lastHeartbeat'],
              );
            });
          }
        });
      });
  });
});
