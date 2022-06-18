import { assert } from 'chai';
import House from '../../../src/core/house/house';
import { NotFoundError } from '../../../src/utils/decorators/error';

describe('House.destroy', () => {
  const house = new House();

  it('should destroy an house', async () => {
    await house.destroy('ecb7958f-ea9e-4520-819e-be6358dc407c');
  });

  it('should not found an house to destroy', async () => {
    const promise = house.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e');
    await assert.isRejected(promise, NotFoundError);
  });
});
