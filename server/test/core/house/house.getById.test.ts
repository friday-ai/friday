import { expect, assert } from 'chai';
import House from '../../../src/core/house/house';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('House.getById', () => {
  const house = new House();

  it('should return a house', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned).to.be.an('object');
    assert.deepEqual(houseReturned, {
      id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      name: 'Main House test',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });
  });

  it('should return a house with full scope', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'full');

    expect(houseReturned).to.have.property('id');
    expect(houseReturned).to.have.property('name');
    expect(houseReturned).to.have.property('latitude');
    expect(houseReturned).to.have.property('longitude');

    // TODO: The state cannot must be null
    if (houseReturned.state !== null) {
      expect(houseReturned.state).to.be.an('object');
      expect(houseReturned.state).to.have.property('id');
      expect(houseReturned.state).to.have.property('owner');
      expect(houseReturned.state).to.have.property('ownerType');
      expect(houseReturned.state).to.have.property('value');
    }

    if (houseReturned.rooms !== null) {
      expect(houseReturned.rooms).to.be.an('array');
      houseReturned.rooms!.forEach((r) => {
        expect(r).to.be.an('object');
        expect(r).to.have.property('id');
        expect(r).to.have.property('name');
        expect(r).to.have.property('houseId');
      });
    }
  });

  it('should return a houses with state', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withState');

    expect(houseReturned).to.have.property('id');
    expect(houseReturned).to.have.property('name');
    expect(houseReturned).to.have.property('latitude');
    expect(houseReturned).to.have.property('longitude');

    // TODO: The state cannot must be null
    if (houseReturned.state !== null) {
      expect(houseReturned.state).to.be.an('object');
      expect(houseReturned.state).to.have.property('id');
      expect(houseReturned.state).to.have.property('owner');
      expect(houseReturned.state).to.have.property('ownerType');
      expect(houseReturned.state).to.have.property('value');
    }
  });

  it('should return a house with rooms', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withRooms');

    expect(houseReturned).to.have.property('id');
    expect(houseReturned).to.have.property('name');
    expect(houseReturned).to.have.property('latitude');
    expect(houseReturned).to.have.property('longitude');

    if (houseReturned.rooms !== null) {
      expect(houseReturned.rooms).to.be.an('array');
      houseReturned.rooms!.forEach((r) => {
        expect(r).to.be.an('object');
        expect(r).to.have.property('id');
        expect(r).to.have.property('name');
        expect(r).to.have.property('houseId');
      });
    }
  });

  it('should not found a house', async () => {
    const promise = house.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
