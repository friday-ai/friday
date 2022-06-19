import { assert, expect } from 'chai';
import { NotFoundError } from '../../../src/utils/decorators/error';
import House from '../../../src/core/house/house';

let house: House;

describe('House.update', () => {
  before(async () => {
    house = global.FRIDAY.house;
  });

  it('should update a house', async () => {
    const updatedHouse = await house.update('ecb7958f-ea9e-4520-819e-be6358dc407c', {
      name: 'House update',
    });

    expect(updatedHouse.name).to.equal('House update');
  });

  it('should not found house to update', async () => {
    const promise = house.update('1b561f76-9574-461c-b79e-e1906fe33c1a', {});

    await assert.isRejected(promise, NotFoundError);
  });
});
