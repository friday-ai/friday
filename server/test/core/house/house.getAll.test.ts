import { expect, assert } from 'chai';
import House from '../../../src/core/house';

describe('House.getAll', () => {
  const house = new House();

  it('should return all houses', async () => {
    const houses = await house.getAll();

    expect(houses).to.be.an('array');
    assert.deepEqual(houses, [{
      id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      name: 'Main House test',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    },
    ]);
  });

  it('should return all houses with full scope', async () => {
    const houses = await house.getAll({ scope: 'full' });

    expect(houses).to.be.an('array');
    houses.forEach((h) => {
      expect(h).to.have.property('id');
      expect(h).to.have.property('name');
      expect(h).to.have.property('latitude');
      expect(h).to.have.property('longitude');

      // TODO: The state cannot must be null
      if (h.state !== null) {
        expect(h.state).to.be.an('object');
        expect(h.state).to.have.property('id');
        expect(h.state).to.have.property('owner');
        expect(h.state).to.have.property('ownerType');
        expect(h.state).to.have.property('value');
      }

      if (h.rooms !== null) {
        expect(h.rooms).to.be.an('array');
        h.rooms!.forEach((r) => {
          expect(r).to.be.an('object');
          expect(r).to.have.property('id');
          expect(r).to.have.property('name');
          expect(r).to.have.property('houseId');
        });
      }
    });
  });

  it('should return all houses with state', async () => {
    const houses = await house.getAll({ scope: 'withState' });

    expect(houses).to.be.an('array');
    houses.forEach((h) => {
      expect(h).to.have.property('id');
      expect(h).to.have.property('name');
      expect(h).to.have.property('latitude');
      expect(h).to.have.property('longitude');

      // TODO: The state cannot must be null
      if (h.state !== null) {
        expect(h.state).to.be.an('object');
        expect(h.state).to.have.property('id');
        expect(h.state).to.have.property('owner');
        expect(h.state).to.have.property('ownerType');
        expect(h.state).to.have.property('value');
      }
    });
  });

  it('should return all houses with rooms', async () => {
    const houses = await house.getAll({ scope: 'withRooms' });

    expect(houses).to.be.an('array');
    houses.forEach((h) => {
      expect(h).to.have.property('id');
      expect(h).to.have.property('name');
      expect(h).to.have.property('latitude');
      expect(h).to.have.property('longitude');

      if (h.rooms !== null) {
        expect(h.rooms).to.be.an('array');
        h.rooms!.forEach((r) => {
          expect(r).to.be.an('object');
          expect(r).to.have.property('id');
          expect(r).to.have.property('name');
          expect(r).to.have.property('houseId');
        });
      }
    });
  });
});
