import { expect } from 'chai';
import Satellite from '../../../src/core/satellite';

describe('Satellite.getAll', () => {
  const satellite = new Satellite();

  it('should return all satellites', async () => {
    const satellites = await satellite.getAll();

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
      expect(s).to.contains.keys(
        ['id', 'name', 'roomId', 'lastHeartbeat'],
      );
    });
  });

  it('should return all satellites with full scope', async () => {
    const satellites = await satellite.getAll({ scope: 'full' });

    expect(satellites).to.be.an('array');

    satellites.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
      expect(s).to.have.property('lastHeartbeat');
      expect(s).to.have.property('room');
      expect(s).to.have.property('state');
      expect(s).to.have.property('variables');
      expect(s).to.have.property('plugins');

      expect(s.room).to.be.an('object');
      expect(s.room).to.have.property('id');
      expect(s.room).to.have.property('name');
      expect(s.room).to.have.property('houseId');

      // TODO: The state cannot must be null
      if (s.state !== null) {
        expect(s.state).to.be.an('object');
        expect(s.state).to.have.property('id');
        expect(s.state).to.have.property('owner');
        expect(s.state).to.have.property('ownerType');
        expect(s.state).to.have.property('value');
      }

      if (s.variables !== null) {
        expect(s.variables).to.be.an('array');
        s.variables!.forEach((v) => {
          expect(v).to.be.an('object');
          expect(v).to.have.property('id');
          expect(v).to.have.property('key');
          expect(v).to.have.property('value');
          expect(v).to.have.property('owner');
          expect(v).to.have.property('ownerType');
        });
      }

      if (s.plugins !== null) {
        expect(s.plugins).to.be.an('array');
        s.plugins!.forEach((p) => {
          expect(p).to.be.an('object');
          expect(p).to.have.property('id');
          expect(p).to.have.property('name');
          expect(p).to.have.property('version');
          expect(p).to.have.property('url');
          expect(p).to.have.property('enabled');
          expect(p).to.have.property('satelliteId');
        });
      }
    });
  });

  it('should return all satellites with room', async () => {
    const satellites = await satellite.getAll({ scope: 'withRoom' });

    expect(satellites).to.be.an('array');

    satellites.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
      expect(s).to.have.property('lastHeartbeat');
      expect(s).to.have.property('room');

      expect(s.room).to.be.an('object');
      expect(s.room).to.have.property('id');
      expect(s.room).to.have.property('name');
      expect(s.room).to.have.property('houseId');
    });
  });

  it('should return all satellites with state', async () => {
    const satellites = await satellite.getAll({ scope: 'withState' });

    expect(satellites).to.be.an('array');

    satellites.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
      expect(s).to.have.property('lastHeartbeat');
      expect(s).to.have.property('state');

      // TODO: The state cannot must be null
      if (s.state !== null) {
        expect(s.state).to.be.an('object');
        expect(s.state).to.have.property('id');
        expect(s.state).to.have.property('owner');
        expect(s.state).to.have.property('ownerType');
        expect(s.state).to.have.property('value');
      }
    });
  });

  it('should return all satellites with variables', async () => {
    const satellites = await satellite.getAll({ scope: 'withVariables' });

    expect(satellites).to.be.an('array');

    satellites.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
      expect(s).to.have.property('lastHeartbeat');
      expect(s).to.have.property('variables');

      if (s.variables !== null) {
        expect(s.variables).to.be.an('array');
        s.variables!.forEach((v) => {
          expect(v).to.be.an('object');
          expect(v).to.have.property('id');
          expect(v).to.have.property('key');
          expect(v).to.have.property('value');
          expect(v).to.have.property('owner');
          expect(v).to.have.property('ownerType');
        });
      }
    });
  });

  it('should return all satellites with plugins', async () => {
    const satellites = await satellite.getAll({ scope: 'withPlugins' });

    expect(satellites).to.be.an('array');

    satellites.forEach((s) => {
      expect(s).to.have.property('id');
      expect(s).to.have.property('name');
      expect(s).to.have.property('roomId');
      expect(s).to.have.property('lastHeartbeat');
      expect(s).to.have.property('plugins');

      if (s.plugins !== null) {
        expect(s.plugins).to.be.an('array');
        s.plugins!.forEach((p) => {
          expect(p).to.be.an('object');
          expect(p).to.have.property('id');
          expect(p).to.have.property('name');
          expect(p).to.have.property('version');
          expect(p).to.have.property('url');
          expect(p).to.have.property('enabled');
          expect(p).to.have.property('satelliteId');
        });
      }
    });
  });
});
