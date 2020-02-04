import House from '../../../src/core/house';
import { NotFoundError } from '../../../src/utils/errors/coreError';

describe('house.update', () => {
  const house = new House();

  it('should update a house', async () => {
    const updatedHouse = await house.update('ecb7958f-ea9e-4520-819e-be6358dc407c', {
      id: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
      name: 'House update'
    });

    expect(updatedHouse.name).toEqual('House update');
  });

  it('should not found house to update', async () => {

    await house.update('1b561f76-9574-461c-b79e-e1906fe33c1a', {
      id: '1b561f76-9574-461c-b79e-e1906fe33c1a'
    })
      .catch((err: Error) => {
        expect(err).toBeInstanceOf(NotFoundError);
      });

  });

});
