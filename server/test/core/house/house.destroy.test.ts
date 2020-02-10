import House from '../../../src/core/house';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('house.destoy', () => {
  const house = new House();

  it('should destroy an house', async () => {
    expect.assertions(0);
    await house.destroy('ecb7958f-ea9e-4520-819e-be6358dc407c');
  });

  it('should not found an house to destroy', async () => {
    expect.assertions(1);
    await house.destroy('a58c31cc-61d2-4c18-b9f6-b8ba8609d12e')
    .catch((err: Error) => {
      expect(err).toBeInstanceOf(NotFoundError);
    });
  });

});
