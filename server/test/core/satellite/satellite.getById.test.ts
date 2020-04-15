import { expect, assert } from 'chai';
import Satellite from '../../../src/core/satellite';

describe('Satellite.getById', () => {
  const satellite = new Satellite();

  it('should return a satellite', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

    expect(satelliteRturned).to.be.an('object');
    assert.deepEqual(satelliteRturned, {
      id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      name: 'Main satellite',
      roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
    });
  });

  it('should return a satellite with full scope', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'full');

    expect(satelliteRturned).to.be.an('object');

    expect(satelliteRturned).to.have.property('id');
    expect(satelliteRturned).to.have.property('name');
    expect(satelliteRturned).to.have.property('roomId');
    expect(satelliteRturned).to.have.property('room');
    expect(satelliteRturned).to.have.property('state');
    expect(satelliteRturned).to.have.property('variables');
    expect(satelliteRturned).to.have.property('plugins');

    expect(satelliteRturned.room).to.be.an('object');
    expect(satelliteRturned.room).to.have.property('id');
    expect(satelliteRturned.room).to.have.property('name');
    expect(satelliteRturned.room).to.have.property('houseId');

    // TODO: The state cannot must be null
    if (satelliteRturned.state !== null) {
      expect(satelliteRturned.state).to.be.an('object');
      expect(satelliteRturned.state).to.have.property('id');
      expect(satelliteRturned.state).to.have.property('owner');
      expect(satelliteRturned.state).to.have.property('ownerType');
      expect(satelliteRturned.state).to.have.property('value');
    }

    if (satelliteRturned.variables !== null) {
      expect(satelliteRturned.variables).to.be.an('array');
      satelliteRturned.variables!.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.have.property('id');
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    }

    if (satelliteRturned.plugins !== null) {
      expect(satelliteRturned.plugins).to.be.an('array');
      satelliteRturned.plugins!.forEach((p) => {
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

  it('should return a satellite with room', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withRoom');


    expect(satelliteRturned).to.be.an('object');

    expect(satelliteRturned).to.have.property('id');
    expect(satelliteRturned).to.have.property('name');
    expect(satelliteRturned).to.have.property('roomId');
    expect(satelliteRturned).to.have.property('room');

    expect(satelliteRturned.room).to.be.an('object');
    expect(satelliteRturned.room).to.have.property('id');
    expect(satelliteRturned.room).to.have.property('name');
    expect(satelliteRturned.room).to.have.property('houseId');
  });

  it('should return a satellite with state', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withState');


    expect(satelliteRturned).to.be.an('object');

    expect(satelliteRturned).to.have.property('id');
    expect(satelliteRturned).to.have.property('name');
    expect(satelliteRturned).to.have.property('roomId');
    expect(satelliteRturned).to.have.property('state');

    // TODO: The state cannot must be null
    if (satelliteRturned.state !== null) {
      expect(satelliteRturned.state).to.be.an('object');
      expect(satelliteRturned.state).to.have.property('id');
      expect(satelliteRturned.state).to.have.property('owner');
      expect(satelliteRturned.state).to.have.property('ownerType');
      expect(satelliteRturned.state).to.have.property('value');
    }
  });

  it('should return a satellite with variables', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withVariables');


    expect(satelliteRturned).to.be.an('object');

    expect(satelliteRturned).to.have.property('id');
    expect(satelliteRturned).to.have.property('name');
    expect(satelliteRturned).to.have.property('roomId');
    expect(satelliteRturned).to.have.property('variables');


    if (satelliteRturned.variables !== null) {
      expect(satelliteRturned.variables).to.be.an('array');
      satelliteRturned.variables!.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.have.property('id');
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    }
  });

  it('should return a satellite with plugins', async () => {
    const satelliteRturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withPlugins');

    expect(satelliteRturned).to.be.an('object');

    expect(satelliteRturned).to.have.property('id');
    expect(satelliteRturned).to.have.property('name');
    expect(satelliteRturned).to.have.property('roomId');
    expect(satelliteRturned).to.have.property('plugins');

    if (satelliteRturned.plugins !== null) {
      expect(satelliteRturned.plugins).to.be.an('array');
      satelliteRturned.plugins!.forEach((p) => {
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
