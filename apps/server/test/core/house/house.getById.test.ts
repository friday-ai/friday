import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import House from '../../../src/core/house/house';

let house: House;

describe('House.getById', () => {
  before(async () => {
    house = global.FRIDAY.house;
  });

  it('should return a house', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned).to.be.an('object');
    expect(houseReturned).to.contains.keys(['id', 'name', 'latitude', 'longitude']);
    expect(houseReturned.id).to.equal('ecb7958f-ea9e-4520-819e-be6358dc407c');
  });

  it('should return a house with full scope', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'full');

    expect(houseReturned).to.be.an('object');
    expect(houseReturned).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'state', 'rooms']);
    expect(houseReturned.id).to.equal('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned.state).to.be.an('object');
    expect(houseReturned.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);

    expect(houseReturned.rooms).to.be.an('array');
    houseReturned.rooms.forEach((room) => {
      expect(room).to.be.an('object');
      expect(room).to.contains.keys(['id', 'name', 'houseId']);
    });
  });

  it('should return a houses with state', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withState');

    expect(houseReturned).to.be.an('object');
    expect(houseReturned).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'state']);
    expect(houseReturned.id).to.equal('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned.state).to.be.an('object');
    expect(houseReturned.state).to.contains.keys(['id', 'owner', 'ownerType', 'value']);
  });

  it('should return a house with rooms', async () => {
    const houseReturned = await house.getById('ecb7958f-ea9e-4520-819e-be6358dc407c', 'withRooms');

    expect(houseReturned).to.be.an('object');
    expect(houseReturned).to.contains.keys(['id', 'name', 'latitude', 'longitude', 'rooms']);
    expect(houseReturned.id).to.equal('ecb7958f-ea9e-4520-819e-be6358dc407c');

    expect(houseReturned.rooms).to.be.an('array');
    houseReturned.rooms.forEach((room) => {
      expect(room).to.be.an('object');
      expect(room).to.contains.keys(['id', 'name', 'houseId']);
    });
  });

  it('should not found a house', async () => {
    const promise = house.getById('edfca72c-89bf-4cee-a4b6-fabbef87528a');

    await assert.isRejected(promise, NotFoundError);
  });
});
