import { HouseCreationAttributes } from '@friday/shared';
import { assert } from 'chai';
import House from '../../../src/core/house/house';
import { DatabaseUniqueConstraintError, DatabaseValidationError } from '../../../src/utils/decorators/error';

let house: House;

describe('House.create', () => {
  before(async () => {
    house = global.FRIDAY.house;
  });

  it('should create a house', async () => {
    const houseToCreate: HouseCreationAttributes = {
      name: 'Second House',
      latitude: '34.0012295',
      longitude: '-118.8067245',
    };
    const createdHouse = await house.create(houseToCreate);

    assert.deepInclude(createdHouse, houseToCreate);
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
