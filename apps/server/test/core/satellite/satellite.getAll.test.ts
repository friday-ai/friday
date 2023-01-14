import { expect } from 'chai';
import Satellite from '../../../src/core/satellite/satellite';

let satellite: Satellite;

describe('Satellite.listAll', () => {
  before(async () => {
    satellite = global.FRIDAY.satellite;
  });

  it('should return all satellites', async () => {
    const satellites = await satellite.listAll();

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
      expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat']);
    });
  });

  it('should return all satellites with full scope', async () => {
    const satellites = await satellite.listAll({ scope: 'full' });

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
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

  it('should return all satellites with room', async () => {
    const satellites = await satellite.listAll({ scope: 'withRoom' });

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
      expect(s).to.be.an('object');
      expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'room']);

      expect(s.room).to.be.an('object');
      expect(s.room).to.contains.keys(['id', 'name', 'houseId']);
    });
  });

  it('should return all satellites with state', async () => {
    const satellites = await satellite.listAll({ scope: 'withState' });

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
      expect(s).to.be.an('object');
      expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'state']);

      expect(s.state).to.be.an('object');
      expect(s.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
    });
  });

  it('should return all satellites with variables', async () => {
    const satellites = await satellite.listAll({ scope: 'withVariables' });

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
      expect(s).to.be.an('object');
      expect(s).to.contains.keys(['id', 'name', 'roomId', 'lastHeartbeat', 'variables']);

      expect(s.variables).to.be.an('array');
      s.variables.forEach((variable) => {
        expect(variable).to.be.an('object');
        expect(variable).to.contains.keys(['id', 'key', 'value', 'owner', 'ownerType']);
      });
    });
  });

  it('should return all satellites with plugins', async () => {
    const satellites = await satellite.listAll({ scope: 'withPlugins' });

    expect(satellites).to.be.an('array');
    satellites.forEach((s) => {
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
