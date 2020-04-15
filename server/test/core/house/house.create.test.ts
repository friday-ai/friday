import { expect, assert } from 'chai';
import House from '../../../src/core/house';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/errors/coreError';

describe('House.create', () => {
  const house = new House();

  it('should create a house', async () => {
    const createdHouse = await house.create({
      id: '1e7056cf-f449-471c-a1e5-fb2e5ec7261f',
      name: 'Second House',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });

    expect(createdHouse).to.have.property('id');
    expect(createdHouse).to.have.property('name');
    expect(createdHouse).to.have.property('latitude');
    expect(createdHouse).to.have.property('longitude');
  });

  it('should not create a house with an existing name', async () => {
    const promise = house.create({
      id: 'd9abed7e-c35b-4a2b-bb6a-5cd2e2ad556e',
      name: 'Main House',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a house with an empty name', async () => {
    const promise = house.create({
      id: 'b54a8587-d921-4c7d-be2d-5cefc264542c',
      name: '',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
