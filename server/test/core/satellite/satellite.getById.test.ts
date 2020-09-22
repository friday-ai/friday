import { expect, assert } from 'chai';
import Satellite from '../../../src/core/satellite';

describe('Satellite.getById', () => {
  const satellite = new Satellite();

  it('should return a satellite', async () => {
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f');

    expect(satelliteReturned).to.be.an('object');
    assert.deepEqual(satelliteReturned, {
      id: 'a7ef5f08-2bad-4489-95bf-b73fcf894d8f',
      name: 'Main satellite',
      roomId: '007d89b5-452e-4b4c-83a2-e6526e09dbf3',
    });
  });

  it('should return a satellite with full scope', async () => {
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'full');

    expect(satelliteReturned).to.be.an('object');

    expect(satelliteReturned).to.have.property('id');
    expect(satelliteReturned).to.have.property('name');
    expect(satelliteReturned).to.have.property('roomId');
    expect(satelliteReturned).to.have.property('room');
    expect(satelliteReturned).to.have.property('state');
    expect(satelliteReturned).to.have.property('variables');
    expect(satelliteReturned).to.have.property('plugins');

    expect(satelliteReturned.room).to.be.an('object');
    expect(satelliteReturned.room).to.have.property('id');
    expect(satelliteReturned.room).to.have.property('name');
    expect(satelliteReturned.room).to.have.property('houseId');

    // TODO: The state cannot must be null
    if (satelliteReturned.state !== null) {
      expect(satelliteReturned.state).to.be.an('object');
      expect(satelliteReturned.state).to.have.property('id');
      expect(satelliteReturned.state).to.have.property('owner');
      expect(satelliteReturned.state).to.have.property('ownerType');
      expect(satelliteReturned.state).to.have.property('value');
    }

    if (satelliteReturned.variables !== null) {
      expect(satelliteReturned.variables).to.be.an('array');
      satelliteReturned.variables!.forEach((v) => {
        expect(v).to.be.an('object');
        expect(v).to.have.property('id');
        expect(v).to.have.property('key');
        expect(v).to.have.property('value');
        expect(v).to.have.property('owner');
        expect(v).to.have.property('ownerType');
      });
    }

    if (satelliteReturned.plugins !== null) {
      expect(satelliteReturned.plugins).to.be.an('array');
      satelliteReturned.plugins!.forEach((p) => {
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
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withRoom');

    expect(satelliteReturned).to.be.an('object');

    expect(satelliteReturned).to.have.property('id');
    expect(satelliteReturned).to.have.property('name');
    expect(satelliteReturned).to.have.property('roomId');
    expect(satelliteReturned).to.have.property('room');

    expect(satelliteReturned.room).to.be.an('object');
    expect(satelliteReturned.room).to.have.property('id');
    expect(satelliteReturned.room).to.have.property('name');
    expect(satelliteReturned.room).to.have.property('houseId');
  });

  it('should return a satellite with state', async () => {
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withState');

    expect(satelliteReturned).to.be.an('object');

    expect(satelliteReturned).to.have.property('id');
    expect(satelliteReturned).to.have.property('name');
    expect(satelliteReturned).to.have.property('roomId');
    expect(satelliteReturned).to.have.property('state');

    // TODO: The state cannot must be null
    if (satelliteReturned.state !== null) {
      expect(satelliteReturned.state).to.be.an('object');
      expect(satelliteReturned.state).to.have.property('id');
      expect(satelliteReturned.state).to.have.property('owner');
      expect(satelliteReturned.state).to.have.property('ownerType');
      expect(satelliteReturned.state).to.have.property('value');
    }
  });

  it('should return a satellite with variables', async () => {
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withVariables');

    expect(satelliteReturned).to.be.an('object');

    expect(satelliteReturned).to.have.property('id');
    expect(satelliteReturned).to.have.property('name');
    expect(satelliteReturned).to.have.property('roomId');
    expect(satelliteReturned).to.have.property('variables');

    if (satelliteReturned.variables !== null) {
      expect(satelliteReturned.variables).to.be.an('array');
      satelliteReturned.variables!.forEach((v) => {
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
    const satelliteReturned = await satellite.getById('a7ef5f08-2bad-4489-95bf-b73fcf894d8f', 'withPlugins');

    expect(satelliteReturned).to.be.an('object');

    expect(satelliteReturned).to.have.property('id');
    expect(satelliteReturned).to.have.property('name');
    expect(satelliteReturned).to.have.property('roomId');
    expect(satelliteReturned).to.have.property('plugins');

    if (satelliteReturned.plugins !== null) {
      expect(satelliteReturned.plugins).to.be.an('array');
      satelliteReturned.plugins!.forEach((p) => {
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
