import { expect, assert } from 'chai';
import House from '../../../src/core/house/house';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('House.update', () => {
  const house = new House();

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
