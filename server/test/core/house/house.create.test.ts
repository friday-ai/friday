import { expect, assert } from 'chai';
import House from '../../../src/core/house/house';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';

describe('House.create', () => {
  const house = new House();

  it('should create a house', async () => {
    const createdHouse = await house.create({
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
      name: 'Main House test',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a house with an empty name', async () => {
    const promise = house.create({
      name: '',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
