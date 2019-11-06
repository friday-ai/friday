import House from '../../../src/core/house';
import { DatabaseUniqueConstraintError } from '../../../src/utils/errors/coreError';

describe('house.create', () => {
  const house = new House();

  it('should create a house', async () => {
    const createdHouse = await house.create({
      id: '1e7056cf-f449-471c-a1e5-fb2e5ec7261f',
      name: 'Second House',
      latitude: '34.0012295',
      longitude: '-118.8067245'
    });

    expect(createdHouse).toHaveProperty('id');
    expect(createdHouse).toHaveProperty('name');
    expect(createdHouse).toHaveProperty('latitude');
    expect(createdHouse).toHaveProperty('longitude');
  });

  it('should not create a house with an existing name', async () => {

    await house.create({
      id: 'd9abed7e-c35b-4a2b-bb6a-5cd2e2ad556e',
      name: 'Main House',
      latitude: '34.0012295',
      longitude: '-118.8067245'
    })
      .catch((err: Error) => {
         expect(err).toBeInstanceOf(DatabaseUniqueConstraintError);
      });
  });

});
