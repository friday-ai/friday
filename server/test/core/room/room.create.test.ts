import { expect, assert } from 'chai';
import Room from '../../../src/core/room';
import { DatabaseValidationError, DatabaseUniqueConstraintError } from '../../../src/utils/errors/coreError';

describe('Room.create', () => {
  const room = new Room();

  it('should create a room', async () => {
    const createdRoom = await room.create({
      id: 'fe20af06-0e4a-4eee-a028-956ff51c6a16',
      name: 'A room test',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    expect(createdRoom).to.have.property('id');
    expect(createdRoom).to.have.property('name');
    expect(createdRoom).to.have.property('houseId');
  });

  it('should not create a room with an existing name', async () => {
    const promise = room.create({
      id: 'e841fbab-6e0d-4bc4-8467-7889d5cec52e',
      name: 'Bedroom',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    await assert.isRejected(promise, DatabaseUniqueConstraintError);
  });

  it('should not create a room with an empty name', async () => {
    const promise = room.create({
      id: 'af3cc3b1-b4e4-4def-ad7a-38ec70e23e62',
      name: '',
      houseId: 'ecb7958f-ea9e-4520-819e-be6358dc407c',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });

  it('should not create a room  with an empty house', async () => {
    const promise = room.create({
      id: '34c490f0-a9f9-4151-84bf-a7321c5f1bea',
      name: 'A room test',
      houseId: '',
    });

    await assert.isRejected(promise, DatabaseValidationError);
  });
});
